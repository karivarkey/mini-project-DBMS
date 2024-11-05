/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        "banzan-red-primary": "#C32148",
        "banzan-yellow-primary": "#FFBF00", // Closing quote and comma added here
        "primary-gray": "#EBEBEB",
      },
    },
  },
  plugins: [],
};
