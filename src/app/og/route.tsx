import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.
export const runtime = "edge";

const regularFont = fetch(
	new URL("../fonts/SpaceGrotesk-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const boldFont = fetch(
	new URL("../fonts/SpaceGrotesk-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
	try {
		const [regularFontData, boldFontData] = await Promise.all([
			regularFont,
			boldFont,
		]);


		return new ImageResponse(
			(
				// Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
				<div
					style={{
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#021528",
						border: "4px solid #FFEDDF",
						
					}}
				>
					<div tw="flex flex-col  w-full py-12 px-4 p-8 ">
						<h1
							tw="font-bold"
							style={{
								marginBottom: "100",
								fontSize: "80",
								color: "#7D98A1",
							}}
						>
							Launch Potion
						</h1>
						<div
							tw="flex flex-row w-full"
							style={{
								alignItems: "center",
								gap: 20,
								fontSize: "50",
								color: "#FFEDDF",
							}}
						>
							Launch your business with an elixir for success!
						</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Inter",
						data: regularFontData,
						weight: 400,
					},
					{
						name: "Inter",
						data: boldFontData,
						weight: 700,
					},
				],
			}
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}