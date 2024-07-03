import merge from "deepmerge";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import newColors, { RANGE } from "./colors";

const extractVars = (
  obj: Record<any, any>,
  prefix: string,
): Record<string, string> => {
  return Object.keys(obj).reduce((vars, key, index) => {
    const value = obj[key];
    const colorKey = prefix === "color" ? RANGE[index] : key;
    const variable =
      key === "DEFAULT" ? `--${prefix}` : `--${prefix}-${colorKey}`;

    const newVars =
      typeof value === "string"
        ? { [variable]: value }
        : extractVars(value, prefix);

    return { ...vars, ...newVars };
  }, {});
};

const config = {
  prefix: "",
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
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
      primary: newColors.marineGreen,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--color-deep)",
        DEFAULT: "0 2px 4px var(--color-deep)",
        lg: "0 8px 16px var(--color-deep)",
      },
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
    plugin(({ addBase, matchUtilities, theme }) => {
      addBase({
        "*": {
          lineHeight: "1",
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
        h1: {
          letterSpacing: "0.05em",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-zilla-slab)",
          fontSize: theme("fontSize.3xl"),
          fontWeight: theme("fontWeight.medium"),
        },
        h2: {
          letterSpacing: "0.05em",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-zilla-slab)",
          fontSize: theme("fontSize.2xl"),
          fontWeight: theme("fontWeight.medium"),
        },
        h3: {
          letterSpacing: "0.05em",
          color: "var(--color-text-primary)",
          fontSize: theme("fontSize.xl"),
          fontFamily: "var(--font-zilla-slab)",
          fontWeight: theme("fontWeight.medium"),
        },
        h4: {
          letterSpacing: "0.05em",
          color: "var(--color-text-primary)",
          fontSize: theme("fontSize.lg"),
          fontFamily: "var(--font-zilla-slab)",
          fontWeight: theme("fontWeight.medium"),
        },
        h5: {
          letterSpacing: "0.05em",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-zilla-slab)",
          fontWeight: theme("fontWeight.medium"),
        },
        h6: {
          letterSpacing: "0.05em",
          color: "var(--color-text-primary)",
          fontSize: theme("fontSize.sm"),
          fontFamily: "var(--font-zilla-slab)",
          fontWeight: theme("fontWeight.medium"),
        },
        a: {
          "@apply transition-colors text-[--color-text-secondary] hover:text-[--color-text-secondary-hover]":
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

      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        ":root": merge(
          extractVars(theme("spacing"), "spacing"),
          extractVars(theme("colors.primary"), "color"),
        ),
      });
    }),
  ],
};

export default config;
