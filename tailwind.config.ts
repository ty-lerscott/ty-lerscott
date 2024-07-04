import merge from "deepmerge";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import { keyMap, colors as newColors } from "./colors";

const HeaderStyles = (
  theme: (theme: string) => string,
): Record<string, string> => ({
  letterSpacing: "0.05em",
  color: "var(--secondary)",
  fontFamily: "var(--font-zilla-slab)",
  fontWeight: theme("fontWeight.medium"),
});

const DEFAULT_SCREEN_SIZE = "1024px";

const SCREENS = {
  xs: "480px",
  sm: "768px",
  md: DEFAULT_SCREEN_SIZE,
  DEFAULT: DEFAULT_SCREEN_SIZE,
};

const config = {
  prefix: "",
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: SCREENS,
    fontFamily: {
      inter: ["var(--font-inner)", "sans-serif"],
      firaCode: ["var(--font-fira-code)", "monospace"],
      zillaSlab: ["var(--font-zilla-slab)", "monospace"],
    },
    fontSize: {
      "3xs": "0.5rem",
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
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.gray,
      ...newColors,
      ...keyMap,
    },
    container: {
      center: true,
      padding: "2rem",
      // screens: {
      //   sm: "640px",
      //   md: "768px",
      //   DEFAULT: DEFAULT_SCREEN_SIZE,
      // },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
        body: {
          display: "grid",
          color: "var(--primary)",
          gridTemplateRows: "auto 1fr auto",
          backgroundColor: "var(--background)",
          minHeight: theme("minHeight.screen"),
          "@apply selection:text-[--background] selection:bg-[--primary]": "",
        },
        main: {
          "@apply container": "",
          padding: theme("spacing.4"),
          paddingBottom: theme("spacing.8"),
          minHeight: theme("minHeight.full"),
          "@apply [&>div]:flex [&>div]:flex-col [&>div]:gap-4": "",
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
          "@apply transition-colors text-[--ghost] hover:text-[--ghost-action]":
            "",
        },
        ul: {
          "@apply space-y-1 list-disc list-inside": "",
          "@apply [&:not([class])]:list-none": "",
          "@apply [&>:not([hidden])~:not([hidden])]:my-[inherit]": "",
          "@apply [&:not([class])~li:first-child]:-ml-2": "",
        },
        ol: {
          "@apply space-y-1 list-decimal list-inside": "",
          "@apply [&:not([class])]:list-none": "",
          "@apply [&:not([class])>li:first-child]:ml-1": "",
        },
      });
    }),
    plugin(function ({ addBase, theme }) {
      const extractColorVars = (
        colorObj: Record<string, any>,
        colorGroup = "",
      ): Record<string, string> => {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable =
            colorKey === "DEFAULT"
              ? `-${colorGroup}`
              : `-${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === "string"
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      };

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    }),
  ],
};

export default config;
