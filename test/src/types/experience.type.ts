export type Experience = {
	id: string;
	title: string;
	company: string;
	location: string;
	work_style: "on-site" | "remote" | "hybrid";
	is_current_employer: boolean;
	start_date: string;
	end_date: string | null;
	body: string;
};
