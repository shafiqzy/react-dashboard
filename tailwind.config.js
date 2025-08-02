/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [
  require("daisyui")({
    prefix: "ds",
    themes: ["mytheme"], // ✅ tell DaisyUI to only use your theme
  }),
],
};
