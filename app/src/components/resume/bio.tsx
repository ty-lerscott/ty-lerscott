import { yearsAgo } from "@/lib/utils";
import SectionHeader from "./section-header";

const ResumeBio = ({ bio }: { bio: string }) => {
	const matches = bio.match(/{{(.*?)}}/);
	const professionalExperience = Array.isArray(matches)
		? yearsAgo(matches[1].split(":")[1])
		: 0;

	return (
		<div style={{ gridArea: "bio" }} className="border-r-2 border-[--ghost]">
			<SectionHeader>About Me</SectionHeader>
			<p className="p-4 tracking-widest text-center leading-4 text-xs">
				{bio.replace(/{{(.*?)}}/, String(professionalExperience))}
			</p>
		</div>
	);
};

export default ResumeBio;
