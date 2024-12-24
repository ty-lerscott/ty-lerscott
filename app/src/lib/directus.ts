import { createDirectus, rest, graphql } from "@directus/sdk";

const isLocal = process.env.NODE_ENV === "development";
const hostname = process.env.NEXT_PUBLIC_HOSTNAME;

export const client = createDirectus(
	`https://${hostname}.${isLocal ? "local" : "com"}`,
)
	.with(rest())
	.with(graphql());

export { readItems, readItem, readFile } from "@directus/sdk";
