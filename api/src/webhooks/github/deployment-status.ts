import { execSync } from "node:child_process";

import env from "@/lib/dotenv";
import dayjs from "@/lib/dayjs";
import discord from "@/lib/discord";
import { logger } from "@/lib/logger";
import type { GHDeploymentStatus } from "@/types";

const restartTimeout = 30 * 1000;

const DeploymentStatusController = async (
	body: GHDeploymentStatus,
): Promise<void> => {
	const {
		deployment_status: { state, updated_at, description, creator },
		sender,
		repository,
	} = body;

	await discord({
		url: repository.url,
		title: `${repository.name}: ${description}`,
		level: state === "success" ? "success" : "critical",
		author: {
			url: sender.url ?? creator.url,
			name: sender.login ?? creator.login,
			avatar: sender.avatar_url ?? creator.avatar_url,
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
			`Restarting all PM2 processes in ${restartTimeout / 1000} seconds...`,
		);

		setTimeout(() => {
			execSync("pm2 restart all");
		}, restartTimeout);
	}

	return Promise.resolve();
};

export default DeploymentStatusController;
