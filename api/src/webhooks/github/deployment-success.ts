import { execSync } from "node:child_process";

import env from "@/lib/dotenv";
import dayjs from "@/lib/dayjs";
import discord from "@/lib/discord";
import type { GHCompletedAction } from "@/types";

const CreatedController = async (body: GHCompletedAction): Promise<void> => {
	const {
		state,
		sender,
		repository,
		updated_at,
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
				value: dayjs(updated_at).format("MMMM DD YYYY hh:mm:ss A"),
			},
		],
	});

	if (env.NODE_ENV === "production") {
		execSync("pm2 restart all");
	}

	return Promise.resolve();
};

export default CreatedController;
