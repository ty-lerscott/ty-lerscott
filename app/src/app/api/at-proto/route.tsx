export async function GET() {
	return new Response(process.env.NEXT_PUBLIC_ATPROTO_DID);
}
