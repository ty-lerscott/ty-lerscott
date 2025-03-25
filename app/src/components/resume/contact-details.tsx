import Link from "next/link";
import { TfiEmail } from "react-icons/tfi";
import { SlScreenSmartphone } from "react-icons/sl";

import SectionHeader from "./section-header";
import { getContactDetails } from "@/lib/cms";
import SocialMap from "@/components/social-map";

const ContactDetails = async () => {
	const contactDetails = await getContactDetails();

	if (!contactDetails) return null;

	const { email, phone, socials } = contactDetails;

	const _socials = socials.filter(
		({ brand }) => !["instagram"].includes(brand as string),
	);

	return (
		<div
			style={{ gridArea: "contact" }}
			className="border-r-2 border-[--ghost]"
		>
			<SectionHeader>Contact</SectionHeader>

			<div className="flex flex-col gap-2 my-4 text-xs items-center">
				<p className="flex gap-2">
					<TfiEmail />
					<span>{email}</span>
				</p>
				<p className="flex gap-2">
					<SlScreenSmartphone />
					<span>{phone}</span>
				</p>
				{(_socials || []).map(({ id, brand, text, href }) => {
					const Icon = SocialMap[brand as keyof typeof SocialMap];

					return (
						<Link key={id} target="_blank" href={href as string}>
							<Icon className="inline-block" />
							<span className="ml-2">{text}</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default ContactDetails;
