import merge from "lodash.mergewith";
import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

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
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
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
				border: "var(--border)",
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
					DEFAULT: "var(--sidebar-background)",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "var(--sidebar-border)",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("tailwind-scrollbar-hide"),
		plugin(({ addBase, theme }) => {
			addBase({
				"*": {
					lineHeight: "1",
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
					"@apply transition-colors hover:text-[--primary-action]": "",
				},
				ul: {
					"@apply list-disc list-outside [&:not([class])>li:not(:first-of-type)]:mt-2":
						"",
				},
				li: {
					"@apply leading-6": "",
				},
				ol: {
					"@apply list-decimal list-inside [&:not([class])>li:not(:first-of-type)]:mt-2":
						"",
				},
			});
		}),
	],
} satisfies Config;
