import type { Conductor } from "@/types";
import CreatedController from "./created";
import StatusCodes from "@/lib/status-codes";
import CompletedController from "./completed";
import InProgressController from "./in-progress";

const Handlers = {
	completed: CompletedController,
	in_progress: InProgressController,
};

const GithubController = async ({ req: { body, method }, res }: Conductor) => {
	console.log({
		action: body.action,
		state: body.state,
	});

	if (method !== "POST" || body.pusher) {
		res.status(StatusCodes.NOT_FOUND).end();
		return;
	}

	if (body.state === "success") {
		console.log("COMPLETED", JSON.stringify(body));
		await CreatedController(body);
	}

	if (body.action in Handlers) {
		await Handlers[body.action as keyof typeof Handlers](body);
	}

	res.status(StatusCodes.OK).end();
};

export default GithubController;
