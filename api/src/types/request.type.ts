import type { Request as ExpressRequest } from "express";

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
