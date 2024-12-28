import { resolve } from "node:path";
import getEnv from "./get-env";
import getPackageJson from "./get-package-json";

const DEBUG = process.env.DEBUG === "true";

const generateConfig = (appDir: string) => {
	if (!appDir) {
		return {};
	}

	const root = resolve(process.cwd(), "..");
	const rootPkg = getPackageJson(root);
	const serverDir = resolve(root, appDir);
	const env = getEnv(resolve(root, appDir));
	const { name } = getPackageJson(serverDir);

	const config = {
		env,
		args: "start",
		cwd: serverDir,
		script: "pnpm",
		instances: "1",
		exec_mode: "fork",
		name: `${rootPkg.name}/${name.split("/")[1]}`,
		ignore_watch: ["node_modules", "logs", "src"],
	};

	if (DEBUG) {
		console.log(appDir, env);
	}

	return config;
};

export default generateConfig;
