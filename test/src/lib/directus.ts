import { createDirectus, rest, graphql } from "@directus/sdk";

import { SITE_URL } from "@/lib/utils";

export const client = createDirectus(SITE_URL({ isCMS: true }))
	.with(rest())
	.with(graphql());

export { readItems, readItem, readFile, readSingleton } from "@directus/sdk";
