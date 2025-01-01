import { execSync } from "node:child_process";

import env from "@/lib/dotenv";
import dayjs from "@/lib/dayjs";
import discord from "@/lib/discord";
import type { GHCompletedAction } from "@/types";

const IS_LOCAL = env.NODE_ENV !== "production";

const CreatedController = async (body: GHCompletedAction): Promise<void> => {
	const {
		state,
		sender,
		repository,
		created_at,
		description,
		commit: {
			author,
			commit: { message },
		},
	} = body;

	const level = state === "success" ? "success" : "critical";

	await discord({
		level,
		url: repository.url,
		title: `${repository.name}: ${description ?? message}`,
		author: {
			url: sender.url ?? author.url,
			name: sender.login ?? author.login,
			avatar: sender.avatar_url ?? author.avatar_url,
		},
		fields: [
			{
				name: "Deployed At",
				value: dayjs(created_at).format("DD-MM-YYYY HH:mm:ss"),
			},
		],
	});

	if (!IS_LOCAL) {
		execSync("pm2 restart all");
	}

	return Promise.resolve();
};

export default CreatedController;
