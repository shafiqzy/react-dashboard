/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#0320fc",
      },
    },
  },
  plugins: [
    require("daisyui")({
      themes: true,
      prefix: "ds-",   // ✅ Apply prefix to DaisyUI components only
    }),
  ],
};
