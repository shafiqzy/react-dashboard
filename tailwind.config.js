/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      // 👉 You can still extend Tailwind utilities if you want,
      // but DaisyUI colors now come from CSS theme, not here
      colors: {
        "main-orange": "#FF9E00",
        "main-gray": "#5C5C5C",
        "soft-gray": "#F2F2F2",
        "dark-gray": "#1E1E1E",
      },
    },
  },

  plugins: [
    require("daisyui"), // ✅ Needed so Tailwind knows about DaisyUI
  ],

  daisyui: {
    prefix: "ds-",  // ✅ keep your ds-btn, ds-card, etc.
    themes: false,  // ✅ tell DaisyUI NOT to load built-in themes
  },
};
