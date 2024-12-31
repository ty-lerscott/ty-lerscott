import { defineConfig } from "tsup";
import env from "./src/lib/dotenv";

console.log("This is tsup", env);

export default defineConfig({
	entry: ["./src/**/*.ts"],
	outDir: "./dist",
	format: ["esm"],
	minify: true,
	sourcemap: true,
	env: {
		...env,
		NODE_ENV: "production",
	},
});
