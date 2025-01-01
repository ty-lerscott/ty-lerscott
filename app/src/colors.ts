const colorsArr = [
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
];

type TagClassesType = (typeof colorsArr)[number];

const colors = {
	[colorsArr[0]]: {
		50: "#FEEBEC",
		100: "#FED7D8",
		200: "#FDB5B6",
		300: "#FB8D8F",
		400: "#FA6668",
		500: "#F94144",
		600: "#F2080C",
		700: "#B70609",
		800: "#7C0406",
		900: "#3B0203",
	},
	[colorsArr[1]]: {
		50: "#FEF2EC",
		100: "#FDE2D4",
		200: "#FAC8AD",
		300: "#F8AB82",
		400: "#F58E56",
		500: "#F3722C",
		600: "#D9540C",
		700: "#A43F09",
		800: "#6F2B06",
		900: "#351503",
	},
	[colorsArr[2]]: {
		50: "#FEF3E6",
		100: "#FEEAD2",
		200: "#FCD5A6",
		300: "#FBC179",
		400: "#F9AC4D",
		500: "#F8961E",
		600: "#DA7B07",
		700: "#A35C05",
		800: "#6D3D03",
		900: "#361F02",
	},
	[colorsArr[3]]: {
		50: "#FEF2EB",
		100: "#FEE8DC",
		200: "#FDCDB5",
		300: "#FBB592",
		400: "#FA9E70",
		500: "#F9844A",
		600: "#F75B0D",
		700: "#BC4306",
		800: "#7B2C04",
		900: "#401702",
	},
	[colorsArr[4]]: {
		50: "#FEF9EB",
		100: "#FEF4DC",
		200: "#FDE9BA",
		300: "#FBDD97",
		400: "#FAD170",
		500: "#F9C74F",
		600: "#F7B10D",
		700: "#C08907",
		800: "#805B04",
		900: "#402E02",
	},
	[colorsArr[5]]: {
		50: "#F4F9F1",
		100: "#EAF2E3",
		200: "#D1E4C3",
		300: "#BCD8A7",
		400: "#A7CB8B",
		500: "#90BE6D",
		600: "#72A64A",
		700: "#557C37",
		800: "#385124",
		900: "#1D2A13",
	},
	[colorsArr[6]]: {
		50: "#EDF8F4",
		100: "#D7EFE8",
		200: "#B2E1D3",
		300: "#8AD1BC",
		400: "#62C1A4",
		500: "#43AA8B",
		600: "#35876F",
		700: "#286654",
		800: "#263b16",
		900: "#1D2A13",
	},
	[colorsArr[7]]: {
		50: "#EBF4F4",
		100: "#DAEBEB",
		200: "#B3D6D5",
		300: "#8EC3C1",
		400: "#69AFAD",
		500: "#4D908E",
		600: "#3E7472",
		700: "#2E5655",
		800: "#1E3838",
		900: "#101E1D",
	},
	[colorsArr[8]]: {
		50: "#EFF2F5",
		100: "#DCE3EA",
		200: "#B9C8D5",
		300: "#96ACC0",
		400: "#7391AB",
		500: "#577590",
		600: "#455D72",
		700: "#344656",
		800: "#232F39",
		900: "#11171D",
	},
	[colorsArr[9]]: {
		50: "#E6F3F9",
		100: "#CEE8F3",
		200: "#9CD1E7",
		300: "#6BBADB",
		400: "#36A1CE",
		500: "#277DA1",
		600: "#1F627F",
		700: "#184C63",
		800: "#103342",
		900: "#081921",
	},
} as Record<TagClassesType, Record<string | number, string>>;

const RANGE = [
	"white",
	"lighter",
	"light",
	"medium-light",
	"medium",
	"medium-dark",
	"dark",
	"darker",
	"darkest",
	"black",
] as const;

const ALIASES = {
	white: ["heading", "hover-secondary", "white"],
	"medium-light": ["hover", "strong"],
	medium: ["foreground"],
	dark: ["ghost"],
	darker: ["border", "subtle"],
	darkest: ["sidebar-background", "skeleton"],
	black: ["background"],
} as Record<(typeof RANGE)[number], string[]>;

// Extract the keys of ALIASES
type AliasKeys = keyof typeof ALIASES;
const ALIAS_KEYS: AliasKeys[] = Object.keys(ALIASES) as AliasKeys[];

// Extract the values of ALIASES and create a union type
type AliasValues = (typeof ALIASES)[AliasKeys][number];

const getColorNameByIndex = (index: number) =>
	colorsArr[index] as (typeof colorsArr)[number];

const getColorMap = (index: number) => {
	const hexRange = Object.values(colors[getColorNameByIndex(index)]);

	return ALIAS_KEYS.reduce(
		(acc, alias) => {
			for (const subAlias of ALIASES[alias]) {
				acc[subAlias] = hexRange[RANGE.findIndex((i) => i === alias)];
			}

			return acc;
		},
		{} as Record<AliasValues, string>,
	);
};

const PRIMARY_INDEX = 6;

export {
	colors,
	colorsArr,
	type RANGE,
	getColorMap,
	PRIMARY_INDEX,
	type TagClassesType,
};
