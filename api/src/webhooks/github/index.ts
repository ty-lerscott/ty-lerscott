import type { Conductor } from "@/types";
import CreatedController from "./created";
import StatusCodes from "@/lib/status-codes";
import CompletedController from "./completed";
import InProgressController from "./in-progress";

const GithubController = async ({ req: { body, method }, res }: Conductor) => {
	if (method !== "POST") {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
		return;
	}

	if (!body?.action) {
		res.status(StatusCodes.CONTINUE).end();
		return;
	}

	switch (body.action) {
		case "created": {
			await CreatedController(body);
			break;
		}
		case "in_progress": {
			await InProgressController(body);
			break;
		}
		case "completed": {
			console.log("CompletedController", body);
			await CompletedController(body);
			break;
		}
		case "workflow_run": {
			break;
		}
		case "queued": {
			break;
		}
		default: {
			console.log("UNHANDLED GITHUB ACTION:", body);
			break;
		}
	}

	res.status(StatusCodes.OK).end();
};

export default GithubController;
