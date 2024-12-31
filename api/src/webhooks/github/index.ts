import type { Conductor } from "@/types";
import CreatedController from "./created";
import StatusCodes from "@/lib/status-codes";
import CompletedController from "./completed";
import InProgressController from "./in-progress";

const GithubController = async ({ req: { body, method }, res }: Conductor) => {
	console.group("GITHUB CONTROLLER");

	if (method !== "POST") {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
		return;
	}

	switch (body.action) {
		case "created": {
			console.log("CREATED", JSON.stringify(body));
			await CreatedController(body);
			break;
		}
		case "in_progress": {
			console.log("IN_PROGRESS", JSON.stringify(body));
			await InProgressController(body);
			break;
		}
		case "completed": {
			console.log("COMPLETED", JSON.stringify(body));
			await CompletedController(body);
			break;
		}
		case "workflow_run": {
			console.log("WORKFLOW_RUN", JSON.stringify(body));
			break;
		}
		case "queued": {
			console.log("QUEUED", JSON.stringify(body));
			break;
		}
		default: {
			console.log("UNHANDLED GITHUB ACTION:", JSON.stringify(body));
			break;
		}
	}
	console.groupEnd();

	res.status(StatusCodes.OK).end();
};

export default GithubController;
