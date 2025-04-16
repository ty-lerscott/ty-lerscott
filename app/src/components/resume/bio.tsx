import { yearsAgo, cn } from "@/lib/utils";
import SectionHeader from "./section-header";

const ResumeBio = ({ bio, className }: { bio: string; className?: string }) => {
	const matches = bio.match(/{{(.*?)}}/);
	const professionalExperience = Array.isArray(matches)
		? yearsAgo(matches[1].split(":")[1])
		: 0;

	return (
		<div className={cn("border-t-2 border-[--ghost] flex", className)}>
			<SectionHeader>About Me</SectionHeader>
			<p className="p-4 tracking-widest text-center leading-5 text-sm">
				{bio.replace(/{{(.*?)}}/, String(professionalExperience))}
			</p>
		</div>
	);
};

export default ResumeBio;
