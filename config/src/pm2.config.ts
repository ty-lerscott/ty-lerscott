import { resolve } from "node:path";
import { generateConfig } from "./utils";

const config = {
	apps: [
		generateConfig(resolve(process.cwd(), "..", "cms")),
		generateConfig(resolve(process.cwd(), "..", "api")),
		generateConfig(resolve(process.cwd(), "..", "app")),
	],
};

module.exports = config;
