import { execSync } from "node:child_process";

import env from "@/lib/dotenv";
import dayjs from "@/lib/dayjs";
import discord from "@/lib/discord";
import type { GHCompletedAction } from "@/types";

const IS_LOCAL = env.NODE_ENV !== "production";

const CompletedController = async (body: GHCompletedAction): Promise<void> => {
	if (body.workflow_job) {
		const {
			sender,
			repository,
			workflow_job: { status, head_sha, started_at, head_branch, completed_at },
		} = body as GHCompletedAction;

		const wasSuccessful = status === "success";
		const level = wasSuccessful ? "success" : "critical";
		const duration = dayjs.duration(
			dayjs(completed_at).diff(dayjs(started_at)),
		);
		const minutes = duration.minutes();
		const seconds = duration.seconds();
		const minutesCombined = minutes
			? `${minutes} minute${minutes === 1 ? "" : "s"}`
			: "";
		const secondsCombined = seconds
			? `${seconds} second${seconds === 1 ? "" : "s"}`
			: "";

		await discord({
			level,
			url: repository.html_url,
			title: `${repository.name} pipeline ${wasSuccessful ? "completed" : "failed"}`,
			author: {
				name: sender.login,
				url: sender.html_url,
				avatar: sender.avatar_url,
			},
			fields: [
				{
					name: "Branch",
					value: head_branch,
					isInline: true,
				},
				{
					name: "Build Duration",
					value: `${minutesCombined}${minutesCombined ? " and " : ""}${secondsCombined}`,
					isInline: true,
				},
			],
			footer: {
				value: head_sha,
			},
		});

		if (!IS_LOCAL) {
			execSync("pm2 restart all");
		}

		return;
	}

	return Promise.resolve();
};

export default CompletedController;
