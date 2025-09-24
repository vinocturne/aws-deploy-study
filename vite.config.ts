import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), TanStackRouterVite()],
	build: {
		target: "es2018", // Optional Chaining 지원하지 않는 버전
		minify: "esbuild",
	},
});
