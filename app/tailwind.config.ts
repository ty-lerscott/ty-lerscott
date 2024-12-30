import merge from "lodash.mergewith";
import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

import makeFavicon from "./src/favicon";
import SCREENS from "./tailwind.screens.config";
import { aliasMap, colors as newColors } from "./src/colors";

makeFavicon();

const HeaderStyles = (
	theme: (theme: string) => string,
): Record<string, string> => ({
	letterSpacing: "0.05em",
	fontFamily: "var(--font-zilla-slab)",
	fontWeight: theme("fontWeight.medium"),
});

export default {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx,ts,mdx}"],
	theme: {
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
			colors: {
				...newColors,
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				sidebar: {
					// DEFAULT: "var(--sidebar-background)",
					// foreground: "hsl(var(--sidebar-foreground))",
					// primary: "hsl(var(--sidebar-primary))",
					// "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					// accent: "hsl(var(--sidebar-accent))",
					// "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					// border: "var(--sidebar-border)",
					// ring: "hsl(var(--sidebar-ring))",
				},
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
		plugin(({ addBase, theme, addComponents }) => {
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
			addComponents({
				".Button": {
					display: "inline-flex",
					whiteSpace: "nowrap",
					color: "var(--ghost)",
					justifyContent: "center",
					fontSize: theme("fontSize.sm"),
					"@apply ring-offset-[--primary]": "",
					"@apply disabled:pointer-events-none": "",
					fontWeight: theme("fontWeight.bold"),
					"@apply px-4 py-2 gap-2 relative items-center rounded transition-colors ring-2 ring-[--ghost]":
						"",
					"@apply focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-offset-2":
						"",
				},
				".Button-Pending": {
					"@apply pointer-events-none": "",
				},
				".Button-Primary": {
					color: "var(--background)",
					backgroundColor: "var(--primary)",
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
				":root": {
					// "--background": ,
				},
				"html.dark": toCssVars(aliasMap),

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
					"@apply bg-[--background] text-[--foreground] transition-colors duration-300":
						"",
				},
				"h1, h2, h3, h4, h5, h6": {
					"@apply text-[--heading]": "",
				},
				h1: merge(HeaderStyles(theme), {
					fontSize: theme("fontSize.3xl"),
				}),
				h2: merge(HeaderStyles(theme), {
					fontSize: theme("fontSize.2xl"),
				}),
				h3: merge(HeaderStyles(theme), {
					fontSize: theme("fontSize.xl"),
				}),
				h4: merge(HeaderStyles(theme), {
					fontSize: theme("fontSize.lg"),
				}),
				h5: HeaderStyles(theme),
				h6: merge(HeaderStyles(theme), {
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
					fontSize: theme("fontSize.sm"),
					fontFamily: theme("font.firaCode"),
				},
				small: {
					fontSize: theme("fontSize.sm"),
				},
				a: {
					"@apply transition-colors hover:text-[--hover]": "",
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
