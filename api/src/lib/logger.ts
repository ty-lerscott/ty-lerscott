import type { NextFunction, Request, Response } from "express";
import omit from "object.omit";
import winston from "winston";

const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "./logs/error.log",
			level: "error",
		}),
		new winston.transports.File({ filename: "./logs/combined.log" }),
	],
});

const LoggerController = (req: Request, _res: Response, next: NextFunction) => {
	const query = omit(req.query, ["auto", "w", "fit", "ixlib", "ixid"]);
	const hasQuery = Object.values(query).some(Boolean);
	const [url] = req.url.split("?");

	if (!/^\/(monitoring|_next|images|favicon)/.test(url)) {
		logger.info(`${req.method} ${url}`, hasQuery && { query });
	}

	next();
};

export { logger };
export default LoggerController;
