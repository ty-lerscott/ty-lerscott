import { resolve } from "node:path";
import {generateConfig} from "./utils";

const cmsPath = resolve(process.cwd(), "..", '..', 'cms');
const uiPath = resolve(process.cwd(), "..", '..', 'ui');

const config = {
	apps: [
        generateConfig(cmsPath),
        generateConfig(uiPath),
    ],
};

module.exports = config;
