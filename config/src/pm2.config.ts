import { resolve } from "node:path";
import { generateConfig } from "./utils";

const config = {
	apps: [generateConfig(resolve(process.cwd(), "..", "cms"))],
};

module.exports = config;
