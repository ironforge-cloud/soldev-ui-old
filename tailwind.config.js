const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "false", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "3xl": "1700px",
        "4xl": "1700px",
      },
      width: {
        "video-3xl": "1030px",
        "video-2xl": "865px",
        "video-xl": "1030px",
        "video-lg": "780px",
        "video-md": "700px",
        "video-sm": "570px",
        "video-xs": "426px",
        card: "360px",
      },
      height: {
        "video-3xl": "579px",
        "video-2xl": "492px",
        "video-xl": "579px",
        "video-lg": "439px",
        "video-md": "396px",
        "video-sm": "321px",
        "video-xs": "240px",
      },
      colors: {
        rose: colors.rose,
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
