import { Fragment } from "react";
import { createId } from "@paralleldrive/cuid2";

import SectionHeader from "./section-header";
import { Separator } from "@/components/ui/separator";

const Education = ({ education }: { education: string[][] }) => {
	return (
		<div style={{ gridArea: "education" }}>
			<SectionHeader>Education</SectionHeader>

			<div className="grid grid-cols-[1fr_auto_1fr]">
				{education.map(([line1, line2], index) => {
					return (
						<Fragment key={createId()}>
							{index > 0 ? <Separator orientation="vertical" /> : null}

							<div className="p-4 flex flex-col gap-2 justify-center items-center text-center">
								<h5>{line1}</h5>
								<p className="text-sm">{line2}</p>
							</div>
						</Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default Education;
