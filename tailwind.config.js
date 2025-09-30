/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0099cc",
        secondary: "#3989A4",
      },
      keyframes: {
        "spin-around": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-around": "spin-around 1s linear infinite",
      },
    },
  },
  plugins: [],
};
