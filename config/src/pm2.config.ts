import { resolve } from "node:path";
import { generateConfig } from "./utils";

const config = {
	apps: [
		generateConfig(resolve(process.cwd(), "..", "cms")),
		generateConfig(resolve(process.cwd(), "..", "api")),
	],
};

module.exports = config;
