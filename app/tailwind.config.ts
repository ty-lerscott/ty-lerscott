import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

import SCREENS from "./tailwind.screens.config";
import { getColorMap, colors, PRIMARY_INDEX } from "./src/colors";

const toCssVars = (
	colorObj: Record<string, string>,
): Record<string, string> => {
	return Object.entries(colorObj).reduce(
		(vars, [key, value]) => {
			vars[`--${key}`] = value;

			return vars;
		},
		{} as Record<string, string>,
	);
};

const HeaderStyles = (
	theme: (theme: string) => string,
	extension?: Record<string, string>,
): Record<string, string> => ({
	letterSpacing: "0.05em",
	fontFamily: "var(--font-zilla-slab)",
	fontWeight: theme("fontWeight.medium"),
	...extension,
});

export default {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx,ts,mdx}"],
	theme: {
		colors,
		screens: SCREENS,
		fontFamily: {
			inter: ["var(--font-inner)", "sans-serif"],
			firaCode: ["var(--font-fira-code)", "monospace"],
			zillaSlab: ["var(--font-zilla-slab)", "monospace"],
		},
		fontSize: {
			"2xs": "0.625rem",
			xs: "0.75rem",
			sm: "0.875rem",
			base: "1rem",
			lg: "1.125rem",
			xl: "1.25rem",
			"2xl": "1.5rem",
			"3xl": "1.875rem",
			"4xl": "2.25rem",
			"5xl": "3rem",
			"6xl": "3.75rem",
			"7xl": "4.5rem",
			"8xl": "6rem",
			"9xl": "8rem",
		},
		extend: {
			transitionDuration: {
				"30s": "30000ms",
			},
			colors: {
				transparent: "transparent",
			},
			borderRadius: {
				lg: "0.5rem",
				md: "0.125rem",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("tailwind-scrollbar-hide"),
		plugin(({ addBase, addComponents }) => {
			addComponents({
				".Button": {
					display: "inline-flex",
					whiteSpace: "nowrap",
					justifyContent: "center",
					"@apply ring-offset-[--primary]": "",
					"@apply disabled:pointer-events-none": "",
					"@apply font-bold text-sm text-[--ghost]": "",
					"@apply px-4 py-2 gap-2 relative items-center rounded transition-colors ring-2 ring-[--ghost]":
						"",
					"@apply focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2":
						"",
				},
				".Button-Pending": {
					"@apply pointer-events-none": "",
				},
				".Button-Primary": {
					"@apply text-[--background] bg-[--foreground]": "",
					"@apply disabled:bg-[--background-secondary] disabled:text-[--ghost]":
						"",
					"@apply hover:text-[--background] hover:bg-[--ghost] focus-visible:ring-[--primary]":
						"",
				},
				".Button-Secondary": {
					"@apply hover:text-[--primary] hover:ring-[--primary] focus-visible:ring-[--primary]":
						"",
					"@apply disabled:bg-[--background-secondary] disabled:text-[--ghost]":
						"",
				},
				".Button-Ghost": {
					"@apply ring-[transparent] hover:text-[--primary]": "",
				},
			});

			addBase({
				":root": toCssVars(getColorMap(PRIMARY_INDEX)),
				"html.dark": toCssVars(getColorMap(PRIMARY_INDEX, true)),
				"section ol li": {
					"@apply list-none": "",
				},
			});
		}),
		plugin(({ addBase, theme }) => {
			addBase({
				"*": {
					lineHeight: "1",
				},
				body: {
					"@apply bg-[--background] text-[--foreground]": "",
				},
				"h1, h2, h3, h4, h5, h6": {
					"@apply text-[--heading]": "",
				},
				h1: HeaderStyles(theme, {
					fontSize: theme("fontSize.3xl"),
				}),
				h2: HeaderStyles(theme, {
					fontSize: theme("fontSize.2xl"),
				}),
				h3: HeaderStyles(theme, {
					fontSize: theme("fontSize.xl"),
				}),
				h4: HeaderStyles(theme, {
					fontSize: theme("fontSize.lg"),
				}),
				h5: HeaderStyles(theme),
				h6: HeaderStyles(theme, {
					fontSize: theme("fontSize.sm"),
				}),
				strong: {
					"@apply text-[--strong]": "",
				},
				sup: {
					"@apply text-[--heading]": "",
				},
				p: {
					lineHeight: theme("lineHeight.normal"),
				},
				code: {
					display: "block",
					whiteSpace: "pre-wrap",
					fontSize: theme("fontSize.sm"),
				},
				small: {
					fontSize: theme("fontSize.sm"),
				},
				a: {
					"@apply text-[--foreground] hover:text-[--hover] transition-colors duration-300":
						"",
				},
				ul: {
					"@apply list-disc list-inside [&:not([class])>li:not(:first-of-type)]:mt-2":
						"",
				},
				li: {
					"@apply leading-6 break-words": "",
				},
				ol: {
					"@apply list-decimal list-inside [&:not([class])>li:not(:first-of-type)]:mt-2":
						"",
				},
			});
		}),
	],
} satisfies Config;
