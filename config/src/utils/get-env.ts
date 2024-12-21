import {readFileSync} from "node:fs";
import {resolve} from "node:path";

const getEnv = (pathname: string) => {
    return readFileSync(resolve(pathname, ".env"), 'utf-8').split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');

        acc[key] = value;

        return acc;
    }, {} as Record<string, string>)
}

export default getEnv;