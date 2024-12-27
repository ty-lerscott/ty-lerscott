import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const query = {
		title: searchParams.get("title"),
		url: searchParams.get("url"),
		subtitle: searchParams.get("subtitle"),
	} as Record<string, string>;

	return new ImageResponse(
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: "flex",
				}}
			>
				<img src={query.url} alt={query.title} style={{ width: "100vw" }} />
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					position: "relative",
					left: 0,
					right: 0,
					flexDirection: "column-reverse",
				}}
			>
				{query.subtitle && (
					<p
						style={{
							fontSize: "2.5rem",
							color: "rgba(0,0,0,0.75)",
							backgroundColor: "rgba(255, 255, 255, 0.5)",
							width: "100%",
							display: "flex",
							justifyContent: "center",
							marginTop: "0px",
							paddingTop: "1rem",
							position: "relative",
							paddingBottom: "1.5rem",
							paddingLeft: "2rem",
							paddingRight: "2rem",
						}}
					>
						{query.subtitle}
					</p>
				)}

				<h1
					style={{
						color: "black",
						marginBottom: "0",
						fontSize: "4rem",
						lineHeight: 1,
						position: "relative",
						paddingTop: "1.5rem",
						paddingLeft: "2rem",
						paddingRight: "2rem",
						backgroundColor: "rgba(255, 255, 255, 0.5)",
					}}
				>
					{query.title}
				</h1>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
