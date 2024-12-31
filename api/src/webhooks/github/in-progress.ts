import discord from "@/lib/discord";
import { logger } from "@/lib/logger";
import type { GHInProgressAction, GHWorkflowJob } from "@/types";

const InProgressController = async ({
	sender,
	repository,
	...body
}: GHInProgressAction): Promise<void> => {
	if (body.workflow_job) {
		const { head_branch, html_url, status, head_sha } =
			body.workflow_job as GHWorkflowJob;

		switch (status) {
			case "in_progress": {
				await discord({
					url: html_url,
					level: "notice",
					title: `${repository.name} build started`,
					author: {
						name: sender.login,
						url: sender.html_url,
						avatar: sender.avatar_url,
					},
					fields: [
						{
							name: "Branch",
							value: head_branch,
						},
					],
					footer: {
						value: head_sha,
					},
				});

				return;
			}
			default: {
				return;
			}
		}
	}

	console.group("UNHANDLED PROGRESS ACTION");
	console.log(body);
	console.groupEnd();

	return new Promise<void>((resolve) => {
		resolve();
	});
};

export default InProgressController;
