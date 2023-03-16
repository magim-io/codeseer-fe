/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "10px",
        sm: "12px",
        base: "14px",
        lg: "16px",
        xl: "18px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "28px",
        "5xl": "32px",
        "6xl": "36px",
      },
      boxShadow: {
        bottom_shadow:
          "rgba(0, 0, 0, 0.1) 0px 6px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        welcome_btn: "0px 6px 22px rgba(0, 0, 0, 0.1);",
      },
      colors: {
        navy: "#1C3879",
        beige: "#EAE3D2",
        winter: "#F9F5EB",
        drark_blue: "#162A4B",
        dark_blue_2: "#144272",
        dark_blue_3: "#205295",
        dark_blue_4: "#2C74B3",
        md_blue: "#1E3D59",
        hue_blue: "#48D3F2",
        light_hue_blue: "#3DAEDA",
        primary_blue: "#29678C",

        primary_gray: "#8F8F8F",
        light_gray: "#D8D8D8",

        light_white: "#F3F3F3",

        md_gray: "#4D4D4D",
        primary: "#42526E",
        primary_text: "#212B36",
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require("@tailwindcss/forms")],
};
