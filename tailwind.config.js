/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  darkMode: "media",
  content: ["./src/app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#FF4D67", dark: "#FF4D67", light: "", },
        secondary: { DEFAULT: "#121212", dark: "#121212", light: "" },
        background: { DEFAULT: "#0D0D0D", dark: "#0D0D0D", light: "" },
        textPrimary: { DEFAULT: "#FFFFFF", dark: "#FFFFFF", light: "" },
        textSecondary: { DEFAULT: "#A4A4A4", dark: "#FFFFFF", light: "" },
        accent: { DEFAULT: 'FD5168', dark: 'FD5168', light: 'FD5168' },
        accentSecondary: { DEFAULT: '1A1A1A', dark: '1A1A1A', light: '' },
      },
    },
  },
  plugins: [],
};
