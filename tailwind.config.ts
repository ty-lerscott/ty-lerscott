import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import newColors from "./colors";

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    fontFamily: {
      inter: ["var(--font-inner)", "sans-serif"],
      firaCode: ["var(--font-fira-code)", "monospace"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.gray,
      ...newColors,
      primary: newColors.laudableLime,
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
    plugin(({ addBase, matchUtilities, theme }) => {
      addBase({
        h1: {
          fontWeight: theme("fontWeight.bold"),
          fontSize: theme("fontSize.2xl"),
        },
        h2: {
          fontWeight: theme("fontWeight.bold"),
          fontSize: theme("fontSize.xl"),
        },
        h3: {
          fontWeight: theme("fontWeight.bold"),
          fontSize: theme("fontSize.lg"),
        },
        h4: {
          fontWeight: theme("fontWeight.bold"),
          fontSize: theme("fontSize.base"),
        },
        h5: {
          fontWeight: theme("fontWeight.bold"),
          fontSize: theme("fontSize.sm"),
        },
        h6: {
          fontWeight: theme("fontWeight.bold"),
          fontSize: theme("fontSize.xs"),
        },
        a: {
          "@apply transition-colors hover:text-[--color-white]": "",
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
