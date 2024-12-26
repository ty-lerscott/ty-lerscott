import type { Data } from "./data.type";

export type GetResponse<T = Data> = {
	data?: T;
	error?: string;
	status: number;
	headers?: Record<string, string | number>;
};
