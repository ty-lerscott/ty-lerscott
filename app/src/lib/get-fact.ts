export type Fact = {
	id: string;
	text: string;
	source: string;
	permalink: string;
	source_url: string;
	language: "en" | "de";
};

const getFact = async (isRandom?: boolean) => {
	"use server";

	return fetch(
		`https://uselessfacts.jsph.pl/api/v2/facts/${isRandom ? "random" : "today"}`,
		{
			next: { revalidate: 60 * 60 * 4 },
		} as RequestInit,
	)
		.then(async (resp) => {
			const data = await resp.json();

			return data as Fact;
		})
		.catch((err) => {
			console.log(
				err instanceof Error
					? `getFact error: ${err.message}`
					: "Unknown Error",
			);

			return {
				id: "",
				text: "",
				source: "",
				permalink: "",
				source_url: "",
				language: "en",
			} as Fact;
		});
};

export default getFact;
