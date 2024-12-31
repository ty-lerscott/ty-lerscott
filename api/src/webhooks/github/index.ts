import type { Conductor } from "@/types";
import StatusCodes from "@/lib/status-codes";
import { Created, Completed, InProgress } from "./hooks";

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
			await Created(body);
			break;
		}
		case "in_progress": {
			await InProgress(body);
			break;
		}
		case "completed": {
			await Completed(body);
			break;
		}
		case "workflow_run": {
			break;
		}
		case "queued": {
			break;
		}
		default: {
			console.log("UNHANDLED GITHUB ACTION:", body.action);
			break;
		}
	}

	res.status(StatusCodes.OK).end();
};

export default GithubController;
