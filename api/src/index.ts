import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import APIConductor from "./conductors";
import { config } from "@dotenvx/dotenvx";
// import LoggerController from "@/utils/logger";
import express, { type RequestHandler } from "express";
// import ImagesMiddleware from "./utils/middleware/images";

const env = config().parsed as Record<string, string>;
const server = express();
const IS_LOCAL = env.NODE_ENV !== "production";
const urlEncoded = bodyParser.urlencoded({
	extended: true,
});

const start = async () => {
	server.use(cors());
	server.use(helmet());
	server.use(bodyParser.json());
	server.use(urlEncoded);
	// server.use(LoggerController);
	// server.use(ImagesMiddleware as RequestHandler);
	server.use(APIConductor as unknown as RequestHandler);

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
