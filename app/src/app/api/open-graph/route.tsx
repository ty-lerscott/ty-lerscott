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
					transform: "translateY(-25%)",
					zIndex: 10,
				}}
			>
				<img src={query.url} alt={query.title} style={{ width: "100vw" }} />
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					zIndex: 20,
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					margin: "0 2rem",
				}}
			>
				<h1
					style={{
						color: "white",
						marginBottom: "8px",
						fontSize: "4rem",
						lineHeight: 1,
					}}
				>
					{query.title}
				</h1>
				{query.subtitle && (
					<p
						style={{
							fontSize: "2.5rem",
							color: "#c8c8c8",
						}}
					>
						{query.subtitle}
					</p>
				)}
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
