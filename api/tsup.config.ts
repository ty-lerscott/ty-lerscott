import { defineConfig } from "tsup";
import env from "./src/lib/dotenv";

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
