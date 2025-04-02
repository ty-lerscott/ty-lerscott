import { Fragment } from "react";
import { createId } from "@paralleldrive/cuid2";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const Education = ({ education }: { education: string[][] }) => {
	return (
		<div style={{ gridArea: "education" }}>
			<div className={cn("flex flex-col border-y-2 border-[--ghost]")}>
				<h3 className="p-4 text-center uppercase tracking-widest">Education</h3>
			</div>

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
