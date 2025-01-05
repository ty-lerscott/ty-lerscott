import env from "@/lib/dotenv";
import crypto from "node:crypto";
import type { Conductor } from "@/types";
import StatusCodes from "@/lib/status-codes";
import DeploymentStatusController from "./deployment-status";

const verifyWebhookSignature = (payload: string, signature: string) =>
	crypto.timingSafeEqual(
		Buffer.from(signature),
		Buffer.from(
			`sha1=${crypto
				.createHmac("sha1", env.GH_WEBHOOK_SECRET)
				.update(JSON.stringify(payload))
				.digest("hex")}`,
		),
	);

const GithubController = async ({ req, res }: Conductor) => {
	const { body, method } = req;

	if (method !== "POST") {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
		return;
	}

	if (!verifyWebhookSignature(req.body, req.get("x-hub-signature") as string)) {
		res.status(StatusCodes.UNAUTHORIZED).end();
		return;
	}

	switch (req.get("x-github-event")) {
		case "deployment_status":
			await DeploymentStatusController(body);
			res.status(StatusCodes.OK).end();
			break;
		default:
			console.log("UNHANDLED GITHUB EVENT:", req.get("x-github-event"));
			res.status(StatusCodes.NOT_FOUND).end();
			return;
	}

	res.status(StatusCodes.NOT_FOUND).end();
};

export default GithubController;
