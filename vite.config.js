/* eslint-disable no-undef */
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { "@": resolve(__dirname, "./src") },
    },
    test: {
        environment: "jsdom",
    },
    css: {
        postcss: {
            plugins: [autoprefixer(), cssnanoPlugin()],
        },
    },
});
