import type { NextFunction, Response } from "express";

import type { Conductor, Request } from "@/types";
import WebhooksConductor from "@/webhooks";

const Conductors = async (req: Request, res: Response, next: NextFunction) => {
	const [basePath, ...extendedPath] = req.originalUrl
		.split("?")[0]
		.replace(/^\//, "")
		.split("/");

	const props: Conductor = {
		res,
		next,
		req: {
			...req,
			extendedPath,
		},
	};

	switch (basePath) {
		case "webhooks":
			await WebhooksConductor(props);
			break;
		default:
			res.send("HELLO WORLD");
			break;
	}

	next();
};

export default Conductors;
