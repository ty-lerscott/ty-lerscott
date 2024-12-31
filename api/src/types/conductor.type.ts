import type { NextFunction, Response } from "express";

import type { Request } from "./http.types";

export type Conductor = {
	req: Request;
	res: Response;
	next: NextFunction;
};
