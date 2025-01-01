import type { Conductor } from "@/types";
import CreatedController from "./created";
import StatusCodes from "@/lib/status-codes";
import CompletedController from "./completed";
import InProgressController from "./in-progress";

const Handlers = {
	created: CreatedController,
	completed: CompletedController,
	in_progress: InProgressController,
};

const GithubController = async ({ req: { body, method }, res }: Conductor) => {
	if (method !== "POST" || body.pusher) {
		res.status(StatusCodes.NOT_FOUND).end();
		return;
	}

	if (body.state === "success") {
		console.log("COMPLETED", JSON.stringify(body));
		await Handlers.created(body);
	}

	if (body.action in Handlers) {
		await Handlers[body.action as keyof typeof Handlers](body);
	}

	res.status(StatusCodes.OK).end();
};

export default GithubController;
