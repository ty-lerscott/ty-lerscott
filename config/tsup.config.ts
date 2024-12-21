import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/pm2.config.ts"],
	outDir: "./dist",
	format: ["cjs"],
	minify: true,
	sourcemap: true,
});
