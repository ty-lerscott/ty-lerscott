import { execSync } from "node:child_process";

import env from "@/lib/dotenv";
import dayjs from "@/lib/dayjs";
import discord from "@/lib/discord";
import { logger } from "@/lib/logger";
import type { GHCompletedAction } from "@/types";

const restartTimeout = 30 * 1000;

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
		title: `${repository.name}: ${message} - ${description}`,
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
		logger.info(
			`Restarting all PM2 processes in ${restartTimeout / 1000} seconds`,
		);

		setTimeout(() => {
			execSync("pm2 restart all");
		}, restartTimeout);
	}

	return Promise.resolve();
};

export default CreatedController;
