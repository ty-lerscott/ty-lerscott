import { readFileSync } from "node:fs";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const getPackageJson = (pathname: string): Record<string, any> => {
	try {
		return JSON.parse(readFileSync(`${pathname}/package.json`, "utf8"));
	} catch (err) {
		return {};
	}
};

export default getPackageJson;
