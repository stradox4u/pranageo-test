/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        maroon: "#5E0B15",
        darkMaroon: "#4B0911",
        gold: "#D9BD55",
        darkGold: "#B89A29",
        lightGold: "#E7D594",
        lavender: "#FDECEF",
        whyte: "#FAF8F8",
        inpGray: "#EBE5E0",
        darkInpGray: "#95775F",
        lightBtnGray: "#DFDFDF",
        darkBtnGray: "#A0A0A0",
      },
    },
  },
  plugins: [],
};
