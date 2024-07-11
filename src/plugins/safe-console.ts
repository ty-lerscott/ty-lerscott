const IS_LOCAL = process.env.APP_ENV === "development";

type VoidFunc = () => void;
type ConsoleVoidFunc = (...data: any[]) => void;

const setVoid = <Generic = VoidFunc>(inputFunc: Generic) =>
  IS_LOCAL ? inputFunc : () => {};

export const group = setVoid<ConsoleVoidFunc>(console.group);
export const groupEnd = setVoid(console.groupEnd);
export const log = setVoid<ConsoleVoidFunc>(console.log);
export const error = setVoid<ConsoleVoidFunc>(console.error);
export const warn = setVoid<ConsoleVoidFunc>(console.warn);
export const info = setVoid<ConsoleVoidFunc>(console.info);
export const dir = setVoid<ConsoleVoidFunc>(console.dir);
