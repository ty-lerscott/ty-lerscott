import type { Conductor } from "@/types";
import StatusCodes from "@/lib/status-codes";
// import InProgressController from "./in-progress";
import DeploymentSuccessController from "./deployment-success";

const GithubController = async ({ req: { body, method }, res }: Conductor) => {
	if (method !== "POST" || body.pusher || body.state === "pending") {
		res.status(StatusCodes.NOT_FOUND).end();
		return;
	}

	if (body.state === "success") {
		await DeploymentSuccessController(body);
		res.status(StatusCodes.OK).end();
		return;
	}

	// if (body.action === "in_progress") {
	// 	await InProgressController(body);
	// 	res.status(StatusCodes.OK).end();
	// 	return;
	// }

	// console.log("UNHANDLED GITHUB ACTION:", JSON.stringify(body));

	res.status(StatusCodes.OK).end();
};

export default GithubController;
