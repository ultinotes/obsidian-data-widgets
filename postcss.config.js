import tailwindPlugin from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import tailwindConfig from "./tailwind.config.js";

export default {
  plugins: [tailwindPlugin(tailwindConfig), autoprefixer],
};
