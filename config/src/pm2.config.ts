import { resolve } from "node:path";
import { generateConfig } from "./utils";

const cmsPath = resolve(process.cwd(), "..", "..", "cms");

const config = {
	apps: [generateConfig(cmsPath)],
};

module.exports = config;
