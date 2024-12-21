import {readFileSync} from 'node:fs';

const getPackageJson = (pathname: string) => {

    try {
        return JSON.parse(readFileSync(`${pathname}/package.json`, 'utf8'));
    } catch (err) {
        return {};
    }
}

export default getPackageJson;