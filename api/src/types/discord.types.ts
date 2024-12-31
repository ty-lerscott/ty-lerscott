export type Level = "info" | "notice" | "success" | "warning" | "critical";

export type User = {
	url: string;
	name: string;
	avatar: string;
};

type Field = {
	name: string;
	value: string;
	isInline?: boolean;
};

export type Message = {
	level: Level;
	url?: string;
	author?: User;
	title?: string;
	image?: string;
	fields?: Field[];
	description?: string;
	footer?: {
		value: string;
		image?: string;
	};
};

export type MessageOptions = {
	debug?: boolean;
};
