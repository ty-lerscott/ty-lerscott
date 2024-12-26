import type { Request } from "./request.type";
import type { Response as ExpressResponse, NextFunction } from "express";

export type Conductor = {
	req: Request;
	next: NextFunction;
	res: ExpressResponse;
};
