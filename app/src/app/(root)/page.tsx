import { cache } from "react";
import { getPage } from "@/lib/cms";
import { setMetadata } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

const getData = cache(async () => {
	const page = await getPage("/", ["body"]);
	return page;
});

export const generateMetadata = async () => {
	const page = await getData();

	if (!page) return null;

	return setMetadata(page.metadata);
};

const RootPage = async () => {
	const page = await getData();

	return (
		<div className="flex flex-col gap-4 mt-2">
			{page?.body ? <ReactMarkdown>{page.body}</ReactMarkdown> : null}
		</div>
	);
};

export default RootPage;
