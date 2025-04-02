import Link from "next/link";
import { TfiEmail } from "react-icons/tfi";
import { SlScreenSmartphone } from "react-icons/sl";

import SectionHeader from "./section-header";
import { getContactDetails } from "@/lib/cms";
import SocialMap from "@/components/social-map";
import { cn } from "@/lib/utils";

const ContactDetails = async ({
	className,
	isSimple,
}: {
	className?: string;
	isSimple?: boolean;
}) => {
	const contactDetails = await getContactDetails();

	if (!contactDetails) return null;

	const { email, phone, socials } = contactDetails;

	const _socials = socials.filter(
		({ brand }) => !["instagram"].includes(brand as string),
	);

	return (
		<div className="flex flex-col border-[--ghost]">
			<div className={cn("flex w-full", className)}>
				<h3
					className={cn(
						"p-4 w-full text-center border-[--ghost] uppercase tracking-widest",
						isSimple
							? "border-y-2 space-between break-all items-center"
							: "border-r-2",
					)}
				>
					Contact
				</h3>
			</div>

			<div
				className={cn(
					"flex gap-2 my-4 text-xs items-center justify-center",
					isSimple ? "flex-row pr-4 gap-4" : "flex-col",
				)}
			>
				<p className="flex items-center">
					<TfiEmail className="inline-block size-4" />
					<span className="ml-2">{email}</span>
				</p>
				<p className="flex items-center">
					<SlScreenSmartphone className="inline-block size-4" />
					<span className="ml-2">{phone}</span>
				</p>

				{(_socials || []).map(({ id, brand, text, href }) => {
					const Icon = SocialMap[brand as keyof typeof SocialMap];

					return (
						<Link
							key={id}
							target="_blank"
							href={href as string}
							className="flex items-center"
						>
							<Icon className="inline-block size-4" />
							<span className="ml-2">{text}</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default ContactDetails;
