import dayjs from "@/lib/dayjs";
import discord from "@/lib/discord";
import type { GHDeploymentAction } from "@/types";

// biome-ignore lint/suspicious/noExplicitAny: For any action with "created" the request body can be anything
const CreatedController = async (body: Record<string, any>): Promise<void> => {
	if (body.deployment) {
		const {
			repository,
			deployment: { task, creator, description, created_at },
		} = body as GHDeploymentAction;

		const level = task === "deploy" ? "success" : "critical";

		await discord({
			level,
			url: repository.url,
			title: `${repository.name} ${description}`,
			author: {
				url: creator.url,
				name: creator.login,
				avatar: creator.avatar_url,
			},
			fields: [
				{
					name: "Deployed At",
					value: dayjs(created_at).format("DD-MM-YYYY HH:mm:ss"),
				},
			],
		});

		return;
	}

	return Promise.resolve();
};

export default CreatedController;
