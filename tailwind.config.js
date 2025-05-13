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
        violet600: "#A78BFA",
        violet800: "#68499F",

        gray900: "#22242B",
        gray600: "#73767E",
        gray200: "#EBECEF",

        skyblue100: "#EAEDF7",
        skyblue200: "#EBEDF8",
        skyblue300: "#D1D6E8",

        red200: "#FFA49D",
        green200: "#C9EDE9",

        kakao: "#FEE500",
      },
      boxShadow: {
        violetGlow: "0 0 4px #744CEB, 0 0 10px #744CEB",
        violetIconGlow: "0 0 2px #744CEB, 0 0 4px #744CEB",
      },
    },
  },
  plugins: [],
};

export default config;
