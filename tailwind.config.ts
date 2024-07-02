import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import newColors from "./colors";

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
        sm: "0 1px 2px var(--shadow)",
        DEFAULT: "0 2px 4px var(--shadow)",
        lg: "0 8px 16px var(--shadow)",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
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
        code: {
          fontSize: theme("fontSize.sm"),
          fontFamily: theme("font.firaCode"),
        },
        small: {
          fontSize: theme("fontSize.sm"),
        },
        h1: {
          letterSpacing: "0.05em",
          color: "var(--color-lighter)",
          fontFamily: "var(--font-zilla-slab)",
          fontSize: theme("fontSize.3xl"),
          fontWeight: theme("fontWeight.medium"),
        },
        h2: {
          letterSpacing: "0.05em",
          color: "var(--color-lighter)",
          fontFamily: "var(--font-zilla-slab)",
          fontSize: theme("fontSize.2xl"),
          fontWeight: theme("fontWeight.medium"),
        },
        h3: {
          letterSpacing: "0.05em",
          color: "var(--color-lighter)",
          fontSize: theme("fontSize.xl"),
          fontFamily: "var(--font-zilla-slab)",
          fontWeight: theme("fontWeight.medium"),
        },
        h4: {
          letterSpacing: "0.05em",
          color: "var(--color-lighter)",
          fontSize: theme("fontSize.lg"),
          fontFamily: "var(--font-zilla-slab)",
          fontWeight: theme("fontWeight.medium"),
        },
        h5: {
          letterSpacing: "0.05em",
          color: "var(--color-lighter)",
          fontFamily: "var(--font-zilla-slab)",
          fontWeight: theme("fontWeight.medium"),
        },
        h6: {
          letterSpacing: "0.05em",
          color: "var(--color-lighter)",
          fontSize: theme("fontSize.sm"),
          fontFamily: "var(--font-zilla-slab)",
          fontWeight: theme("fontWeight.medium"),
        },
        a: {
          "@apply transition-colors hover:text-[--color-lighter]": "",
        },
        ul: {
          "@apply space-y-1 list-disc list-inside": "",
        },
        ol: {
          "@apply space-y-1 list-decimal list-inside": "",
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
  ],
};

export default config;
