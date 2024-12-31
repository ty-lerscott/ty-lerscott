import cors from "cors";
import helmet from "helmet";
import env from "./lib/dotenv";
import bodyParser from "body-parser";
import APIConductor from "./conductors";
import LoggerController from "./lib/logger";
import express, { type RequestHandler } from "express";

const server = express();

const IS_LOCAL = env.NODE_ENV !== "production";
const urlEncoded = bodyParser.urlencoded({
	extended: true,
});

const start = () => {
	server.use(cors());
	server.use(helmet());
	server.use(bodyParser.json());
	server.use(urlEncoded);
	server.use(LoggerController);
	server.use(APIConductor as RequestHandler);

	server.listen(env.API_PORT, (err?: Error) => {
		if (err) throw err;
		console.log(
			`> Ready on https://api.lerscott.${IS_LOCAL ? "local" : "com"}`,
		);
	});
};

start();
