import GithubController from "./github";
import type { Conductor } from "@/types";
import StatusCodes from "@/lib/status-codes";

const WebhooksConductor = async ({ req, res, next }: Conductor) => {
	const [domain] = req.extendedPath;

	switch (domain) {
		case "github":
			await GithubController({ req, res, next });
			break;
		default:
			res.status(StatusCodes.NOT_FOUND).end();
			break;
	}
};

export default WebhooksConductor;
