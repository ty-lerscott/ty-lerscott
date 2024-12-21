import { resolve } from "node:path";
import { generateConfig } from "./utils";

const cmsPath = resolve(process.cwd(), "..", "..", "cms");
const appPath = resolve(process.cwd(), "..", "..", "app");

const config = {
	apps: [generateConfig(cmsPath), generateConfig(appPath)],
};

module.exports = config;
