import { ImageResponse } from "@vercel/og";
import { TfiEmail } from "react-icons/tfi";
import { SlScreenSmartphone } from "react-icons/sl";

import pkg from "~/package.json";
import { aliasMap } from "@/colors";
import { getContactDetails } from "@/lib/cms";
import { setImageUrl, SITE_URL } from "@/lib/utils";

import {
	AiFillGithub,
	AiFillLinkedin,
	AiFillInstagram,
	AiFillTwitterSquare,
} from "react-icons/ai";

const SOCIALS = {
	github: AiFillGithub,
	linkedin: AiFillLinkedin,
	instagram: AiFillInstagram,
	twitter: AiFillTwitterSquare,
};

const itemStyles = {
	fontSize: "18px",
	width: "100%",
	color: aliasMap.foreground,
	borderColor: aliasMap.border,
	borderWidth: "1px",
	borderStyle: "solid",
	padding: "1vw",
	borderRadius: "1vw",
	display: "flex",
	alignItems: "center",
	gap: "1vw",
};

const document = {
	width: 1200,
	height: 630,
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const slug = searchParams.get("slug");

	const contactDetails = await getContactDetails(true);

	const imgSrc = `${setImageUrl(contactDetails.image)}?quality=50&width=500&height=500`;

	return new ImageResponse(
		<div
			style={{
				width: `${document.width}px`,
				height: `${document.height}px`,
				display: "flex",
				position: "relative",
				backgroundColor: aliasMap.background,
			}}
		>
			<div
				style={{
					gap: "1vw",
					margin: "1vw",
					width: "26vw",
					padding: "1vw",
					borderRadius: "1vw",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
					backgroundColor: aliasMap["sidebar-background"],
				}}
			>
				<img
					style={{
						borderRadius: "100%",
						borderWidth: "4px",
						borderColor: aliasMap.white,
						display: "flex",
						justifyContent: "center",
						overflow: "hidden",
						height: "175px",
						width: "175px",
						boxShadow: `0 10px 10px 4px ${aliasMap.background}`,
					}}
					src={imgSrc}
					alt={pkg.details.author.name}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "8px",
						marginTop: "4vh",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<h1
						style={{
							fontSize: "24px",
							fontWeight: 900,
							color: aliasMap.heading,
							margin: 0,
						}}
					>
						{pkg.details.author.name}
					</h1>
					<p
						style={{
							fontSize: "20px",
							fontWeight: 900,
							color: aliasMap.foreground,
							margin: 0,
							textAlign: "center",
							lineHeight: 1,
						}}
					>
						{contactDetails.current_role.title}
					</p>
					<span
						style={{
							fontSize: "16px",
							color: aliasMap.foreground,
						}}
					>
						{contactDetails.current_role.location}
					</span>
				</div>
			</div>

			<div
				style={{
					width: "71vw",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					padding: "1vw 0",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<ul
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1vw",
						width: "100%",
					}}
				>
					<li style={itemStyles}>
						<TfiEmail />
						<span>{contactDetails.email}</span>
					</li>
					<li style={itemStyles}>
						<SlScreenSmartphone />
						<span>{contactDetails.phone}</span>
					</li>
					{contactDetails.socials.map(({ id, brand, text }) => {
						const Icon = SOCIALS[brand as keyof typeof SOCIALS];

						return (
							<li style={itemStyles} key={id}>
								<Icon />
								<span>{text}</span>
							</li>
						);
					})}
				</ul>
				<p
					style={{
						color: aliasMap.subtle,
						alignSelf: "flex-end",
						margin: 0,
					}}
				>
					{`${SITE_URL()}${slug}`}
				</p>
			</div>
		</div>,
		document,
	);
}
