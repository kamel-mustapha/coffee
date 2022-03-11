const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        digital: ["Digital"],
      },
      maxHeight: {
        "mi-screen": "60vh",
        large: "92vh",
      },
      height: {
        large: "90vh",
      },
      minHeight: {
        "mi-screen": "60vh",
        large: "92vh",
      },
      backgroundColor: {
        primary: "#2A6E49",
        secondary: "#05386B",
        three: "#379683",
        four: "#8EE4AF",
        five: "#EDF5E1",
        six: "#134e5e",
        seven: "#71b280",
      },
      colors: {
        primary: "#5CDB95",
        secondary: "#05386B",
        three: "#379683",
        four: "#8EE4AF",
        five: "#EDF5E1",
        six: "#134e5e",
        seven: "#71b280",
      },
    },
  },
  variants: {},
  plugins: [],
};
