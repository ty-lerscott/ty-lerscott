const colors = {
	tomatoFrog: {
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
	seLeiOrange: {
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
	marineGreen: {
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
	mirageLake: {
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
	prominentBlue: {
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
	royalPurple: {
		50: "#F3EEFB",
		100: "#E2D4F4",
		200: "#CAB1EC",
		300: "#B28EE3",
		400: "#9A6BDB",
		500: "#7851A9",
		600: "#563D7E",
		700: "#3C2956",
		800: "#24152D",
		900: "#14091B",
	},
} as Record<string, Record<string | number, string>>;

const degreeArray = [
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

const aliasMapLight = {
	white: ["background"],
	lighter: ["sidebar", "skeleton"],
	medium: ["border", "ghost", "hover"],
	dark: ["foreground", "code"],
	darker: ["heading", "hover-secondary", "strong"],
	black: ["white"],
} as Record<(typeof degreeArray)[number], string[]>;

const aliasMapDark = {
	white: ["heading", "hover-secondary", "white"],
	lighter: ["code"],
	"medium-light": ["hover", "strong"],
	medium: ["foreground"],
	dark: ["ghost"],
	darker: ["border"],
	darkest: ["sidebar", "skeleton"],
	black: ["background"],
} as Record<(typeof degreeArray)[number], string[]>;

const getColorNameByIndex = (index: number): string =>
	Object.keys(colors)[index];

const getColorMap = (index: number, isDark?: boolean) => {
	const hexRange = Object.values(colors[getColorNameByIndex(index)]);
	const aliasMap = isDark ? aliasMapDark : aliasMapLight;

	return Object.keys(aliasMap).reduce(
		(acc, alias) => {
			for (const subAlias of aliasMap[alias as keyof typeof aliasMap]) {
				acc[subAlias] = hexRange[degreeArray.findIndex((i) => i === alias)];
			}

			return acc;
		},
		{} as Record<(typeof aliasMap)[keyof typeof aliasMap][number], string>,
	);
};

const PRIMARY_INDEX = 0;

export { colors, getColorMap, PRIMARY_INDEX };
