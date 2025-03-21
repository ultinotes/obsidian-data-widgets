import {sveltePreprocess} from 'svelte-preprocess';

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  // NOTE: use sveltePreprocess for PostCSS support:
  // https://github.com/sle-c/vite-svelte-ts-tailwind/blob/master/svelte.config.js
  preprocess: sveltePreprocess({
    postcss: true,
  }),
  compilerOptions: {
    customElement: true,
  },
  kit: {
    vite: {
      build: {
        rollupOptions: {
          external: ['obsidian'], // Mark 'obsidian' as external
        },
      },
    },
  },
};
