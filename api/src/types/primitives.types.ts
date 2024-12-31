export type Primitives = string | number | boolean | null | Buffer | undefined;
export type PrimitiveObject = Record<string, Primitives | Primitives[]>;

export type Data =
	| Primitives
	| Primitives[]
	| PrimitiveObject
	| PrimitiveObject[];
