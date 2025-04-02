import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";
import SectionHeader from "./section-header";
import type { Experience as ExperienceType } from "@/types";

const Experience = ({
	body,
	title,
	company,
	end_date,
	location,
	work_style,
	start_date,
}: ExperienceType) => {
	const located = `${company} - ${location}${work_style !== "on-site" ? ` - (${work_style})` : ""}`;
	const date = `${dayjs(start_date).format("MMM YYYY")} - ${end_date ? dayjs(end_date).format("MMM YYYY") : "Present"}`;

	return (
		<div
			data-testid="Experience"
			className="p-4 flex flex-col gap-4 even:bg-[--sidebar]"
		>
			<div data-testid="ExperienceHeader" className="flex flex-col gap-1">
				<div className="flex justify-between items-end">
					<h5 className="text-[--white]">{title}</h5>
					<span className="text-sm text-[--foreground]">{date}</span>
				</div>
				<span className="text-sm text-[--foreground]">{located}</span>
			</div>
			<ReactMarkdown>{body}</ReactMarkdown>
		</div>
	);
};

const Experiences = ({
	isSimple,
	experiences,
}: {
	isSimple?: boolean;
	experiences: ExperienceType[];
}) => {
	/**
	 * NOTE:
	 *      I would prefer Array.prototype.toReversed(), but that's not part of the standard yet
	 *      using slice reverse as a hacky alternative
	 *  TODO:
	 * 		Replace with toReversed when it's standardized
	 */
	const ordered = experiences.slice().reverse() as ExperienceType[];

	return (
		<div>
			<div className={cn("flex flex-col border-y-2 border-[--ghost]")}>
				<h3 className="p-4 text-center uppercase tracking-widest">
					Experiences
				</h3>
			</div>

			<div
				className={cn(
					isSimple ? "" : "xs:scrollbar-hide overflow-y-scroll max-h-[90rem]",
				)}
			>
				{ordered.map((exp) => {
					return <Experience key={exp.id} {...exp} />;
				})}
			</div>
		</div>
	);
};

export default Experiences;
