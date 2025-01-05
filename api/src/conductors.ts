import type { NextFunction, Response } from "express";

import WebhooksConductor from "@/webhooks";
import StatusCodes from "@/lib/status-codes";
import type { Conductor, Request } from "@/types";

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
		case "webhooks":
			await WebhooksConductor(props);
			break;
		default:
			res.status(StatusCodes.NOT_FOUND).end();
			break;
	}

	next();
};

export default Conductors;
