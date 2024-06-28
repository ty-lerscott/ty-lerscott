import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

export const colorsArr = [
  "tomatoFrog",
  "persimmonOrange",
  "miamiMarmalade",
  "seLeiOrange",
  "goBananas",
  "laudableLime",
  "marineGreen",
  "mirageLake",
  "copenBlue",
  "prominentBlue",
] as const;

export type TagClassesType = (typeof colorsArr)[number];

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.gray,
      [colorsArr[0]]: {
        50: "#FEEBEC",
        100: "#FED7D8",
        200: "#FDB5B6",
        300: "#FB8D8F",
        400: "#FA6668",
        500: "#F94144",
        DEFAULT: "#F94144",
        600: "#F2080C",
        700: "#B70609",
        800: "#7C0406",
        900: "#3B0203",
        950: "#1E0101",
      },
      [colorsArr[1]]: {
        50: "#FEF2EC",
        100: "#FDE2D4",
        200: "#FAC8AD",
        300: "#F8AB82",
        400: "#F58E56",
        500: "#F3722C",
        DEFAULT: "#F3722C",
        600: "#D9540C",
        700: "#A43F09",
        800: "#6F2B06",
        900: "#351503",
        950: "#1D0B02",
      },
      [colorsArr[2]]: {
        50: "#FEF3E6",
        100: "#FEEAD2",
        200: "#FCD5A6",
        300: "#FBC179",
        400: "#F9AC4D",
        500: "#F8961E",
        DEFAULT: "#F8961E",
        600: "#DA7B07",
        700: "#A35C05",
        800: "#6D3D03",
        900: "#361F02",
        950: "#190E01",
      },
      [colorsArr[3]]: {
        50: "#FEF2EB",
        100: "#FEE8DC",
        200: "#FDCDB5",
        300: "#FBB592",
        400: "#FA9E70",
        500: "#F9844A",
        DEFAULT: "#F9844A",
        600: "#F75B0D",
        700: "#BC4306",
        800: "#7B2C04",
        900: "#401702",
        950: "#1E0B01",
      },
      [colorsArr[4]]: {
        50: "#FEF9EB",
        100: "#FEF4DC",
        200: "#FDE9BA",
        300: "#FBDD97",
        400: "#FAD170",
        500: "#F9C74F",
        DEFAULT: "#F9C74F",
        600: "#F7B10D",
        700: "#C08907",
        800: "#805B04",
        900: "#402E02",
        950: "#1E1501",
      },
      [colorsArr[5]]: {
        50: "#F4F9F1",
        100: "#EAF2E3",
        200: "#D1E4C3",
        300: "#BCD8A7",
        400: "#A7CB8B",
        500: "#90BE6D",
        DEFAULT: "#90BE6D",
        600: "#72A64A",
        700: "#557C37",
        800: "#385124",
        900: "#1D2A13",
        950: "#0F1509",
      },
      [colorsArr[6]]: {
        50: "#EDF8F4",
        100: "#D7EFE8",
        200: "#B2E1D3",
        300: "#8AD1BC",
        400: "#62C1A4",
        500: "#43AA8B",
        DEFAULT: "#43AA8B",
        600: "#35876F",
        700: "#286654",
        800: "#1B4639",
        900: "#0D211B",
        950: "#07120F",
      },
      [colorsArr[7]]: {
        50: "#EBF4F4",
        100: "#DAEBEB",
        200: "#B3D6D5",
        300: "#8EC3C1",
        400: "#69AFAD",
        500: "#4D908E",
        DEFAULT: "#4D908E",
        600: "#3E7472",
        700: "#2E5655",
        800: "#1E3838",
        900: "#101E1D",
        950: "#070D0D",
      },
      [colorsArr[8]]: {
        50: "#EFF2F5",
        100: "#DCE3EA",
        200: "#B9C8D5",
        300: "#96ACC0",
        400: "#7391AB",
        500: "#577590",
        DEFAULT: "#577590",
        600: "#455D72",
        700: "#344656",
        800: "#232F39",
        900: "#11171D",
        950: "#0A0D10",
      },
      [colorsArr[9]]: {
        50: "#E6F3F9",
        100: "#CEE8F3",
        200: "#9CD1E7",
        300: "#6BBADB",
        400: "#36A1CE",
        500: "#277DA1",
        DEFAULT: "#277DA1",
        600: "#1F627F",
        700: "#184C63",
        800: "#103342",
        900: "#081921",
        950: "#040D10",
      },
      primary: {
        white: "#dad7cd",
        light: "#a3b18a",
        medium: "#588157",
        DEFAULT: "#3a5a40",
        dark: "#1d2b24",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // fontSize: {
      //   2xs:
      // },
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
    plugin(({ addBase, addComponents, theme, addUtilities }) => {
      addBase({
        h1: {
          fontSize: theme("fontSize.2xl"),
        },
        h2: {
          fontSize: theme("fontSize.xl"),
        },
        h3: {
          fontSize: theme("fontSize.lg"),
        },
        h4: {
          fontSize: theme("fontSize.base"),
        },
        h5: {
          fontSize: theme("fontSize.sm"),
        },
        h6: {
          fontSize: theme("fontSize.xs"),
        },
        a: {
          "@apply transition-colors hover:text-[--color-white]": "",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
