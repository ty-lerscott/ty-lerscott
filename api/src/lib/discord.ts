import { MessageBuilder, Webhook } from "discord-webhook-node";

import env from "@/lib/dotenv";
import { logger } from "@/lib/logger";
import type { Level, Message, MessageOptions } from "@/types";

const LEVEL = {
	info: "#1982c4",
	notice: "#6a4c93",
	success: "#8ac926",
	warning: "#ffca3a",
	critical: "#ff595e",
} as Record<Level, string>;

const FIXTURE = {
	info: "i",
	notice: "🔔",
	success: "🌟",
	warning: "🚧",
	critical: "🚨",
} as Record<Level, string>;

const hook = new Webhook(env.DISCORD_WEBHOOK_URL);

const prefixTitle = (title: string, level: Level) => {
	const fixture = FIXTURE[level];
	return `${fixture} ${title} ${fixture}`;
};

const sendMessage = async ({
	url,
	author,
	fields,
	title,
	image,
	footer,
	description,
	level = "info",
}: Message) => {
	const embed = new MessageBuilder()
		.setTimestamp()
		.setColor(LEVEL[level as Level] as unknown as number);

	if (author) {
		embed.setAuthor(author.name, author.avatar, author.url);
	}

	if (title) {
		embed.setTitle(prefixTitle(title, level));
	}

	if (description) {
		embed.setDescription(description);
	}

	if (url) {
		// @ts-ignore
		embed.setURL(url);
	}

	if (fields?.length) {
		for (const field of fields) {
			embed.addField(field.name, field.value, field.isInline);
		}
	}

	if (image) {
		embed.setImage(image);
	}

	if (footer) {
		embed.setFooter(footer.value, footer.image);
	}

	return hook.send(embed);
};

const Bot = async (
	message: Message,
	options?: MessageOptions,
): Promise<void> => {
	message.level = message.level || "info";

	if (options?.debug) {
		console.log(message);
		return Promise.resolve();
	}

	try {
		await sendMessage(message);
		logger.info("pushed to discord");
	} catch (error) {
		logger.error(`failed to pushed to discord: ${(error as Error).message}`);
	}
};

export default Bot;
