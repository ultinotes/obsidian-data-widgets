import postcss from "./postcss.config.js";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      // '@scheduler': '/../scheduler/src',
    },
  },
  build: {
    // target: 'es2015',
    // REVIEW: assets inside plugin folder are not automatically synced
    // --> place component bundles in vault
    outDir: "../../../../../Extras/components",
    rollupOptions: {
      output: {
        format: "iife",
        entryFileNames: "bundle.js",
      },
    },
  },
  css: {
    postcss: postcss,
  },
});
