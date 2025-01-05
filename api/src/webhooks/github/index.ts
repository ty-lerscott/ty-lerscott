import type { Conductor } from "@/types";
import StatusCodes from "@/lib/status-codes";
import DeploymentStatusController from "./deployment-status";

const GithubController = async ({ req, res }: Conductor) => {
	const { body, method } = req;

	if (method !== "POST") {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
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
