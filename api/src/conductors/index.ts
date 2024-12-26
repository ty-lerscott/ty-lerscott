import type { Conductor, Request } from "@/types";
import type { NextFunction, Response } from "express";

const Conductors = async (req: Request, res: Response, next: NextFunction) => {
	const [basePath, ...extendedPath] = req.originalUrl
		.split("?")[0]
		.replace(/^\//, "")
		.split("/");

	const newReq = req;
	newReq.extendedPath = extendedPath;

	const props: Conductor = {
		res,
		next,
		req: newReq,
	};

	switch (basePath) {
		default:
			res.send("HELLO WORLD");
			break;
	}

	next();
};

export default Conductors;
