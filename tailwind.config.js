/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
        violet300: "#EADFFF",
        violet600: "#68499F",

        gray900: "#22242B",
        gray600: "#73767E",
        gray200: "#EBECEF",

        skyblue100: "#EAEDF7",
        skyblue200: "#EBEDF8",
        skyblue300: "#D1D6E8",

        red200: "#FFA49D",
        green200: "#C9EDE9",
      },
    },
  },
  plugins: [],
};

export default config;
