import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { config } from "@dotenvx/dotenvx";
import express, { type RequestHandler } from "express";

import APIConductor from "./conductors";
import { LoggerController } from "@/utils";

const env = config().parsed as Record<string, string>;
const server = express();
const IS_LOCAL = env.NODE_ENV !== "production";
const urlEncoded = bodyParser.urlencoded({
	extended: true,
});

const start = async () => {
	server.use(cors());
	server.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					"img-src": [
						"'self'",
						"data:",
						`https://cms.lerscott.${IS_LOCAL ? "local" : "com"}`,
					],
					"script-src": ["'self'", "https://cdn.tailwindcss.com"],
				},
			},
		}),
	);
	server.use(bodyParser.json());
	server.use(urlEncoded);
	server.use(LoggerController);
	server.use(APIConductor as RequestHandler);

	server.listen(env.PORT, (err?: Error) => {
		if (err) throw err;
		console.log(
			`> Ready on https://api.lerscott.${IS_LOCAL ? "local" : "com"}`,
		);
	});
};

(async () => {
	await start();
})();
