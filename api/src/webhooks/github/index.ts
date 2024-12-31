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

	console.group("GithubController");
	console.log({ action: body.action });
	switch (body.action) {
		case "created": {
			console.log("CREATED", body);
			await CreatedController(body);
			break;
		}
		case "in_progress": {
			console.log("IN_PROGRESS", body);
			await InProgressController(body);
			break;
		}
		case "completed": {
			console.log("COMPLETED", body);
			await CompletedController(body);
			break;
		}
		case "workflow_run": {
			console.log("WORKFLOW_RUN", body);
			break;
		}
		case "queued": {
			console.log("QUEUED", body);
			break;
		}
		default: {
			console.log("UNHANDLED GITHUB ACTION:", body);
			break;
		}
	}
	console.groupEnd();

	res.status(StatusCodes.OK).end();
};

export default GithubController;
