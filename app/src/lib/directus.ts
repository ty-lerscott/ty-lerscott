import { createDirectus, rest, graphql } from "@directus/sdk";

const isLocal = process.env.NODE_ENV === "development";

export const client = createDirectus(
	`https://cms.lerscott.${isLocal ? "local" : "com"}`,
)
	.with(rest())
	.with(graphql());

export { readItems, readItem } from "@directus/sdk";
