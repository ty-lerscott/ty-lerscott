import type { Request as ExpressRequest } from "express";

import type { Data } from "./primitives.types";

export type HTTP_METHODS =
	| "GET"
	| "POST"
	| "PUT"
	| "DELETE"
	| "PATCH"
	| "HEAD"
	| "OPTIONS"
	| "TRACE"
	| "CONNECT";

export type Request = Omit<ExpressRequest, "method"> & {
	method: HTTP_METHODS;
	basePath: string;
	host: string;
	headers: ExpressRequest["headers"];
	extendedPath: string[];
};

export type Response<T = Data> = {
	data?: T;
	error?: string;
	status: number;
	headers?: Record<string, string | number>;
};
