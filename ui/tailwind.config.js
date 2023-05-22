import tailwindThemer from "tailwindcss-themer";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: "768px",
      lg: "1024px",
      max: "1280px",
    },
    extend: {},
  },
  plugins: [
    tailwindThemer({
      defaultTheme: {
        name: "light",
        extend: {
          colors: {
            primary: "#6DB49B",
            primaryLighter: "#7AC5AA",
            error: "#BF5552",
            text: {
              main: "#282828",
              placeholder: "#828397",
              onPrimary: "#FFFFFF",
            },
            bg: {
              primary: "#F6F5FC",
              accent: "#FFFFFF",
              nav: "#FFFFFF",
            },
          },
        },
      },
      // themes: [
      //   {
      //     name: "dark",
      //     extend: {
      //       colors: {
      //         primary: "red",
      //         bg: {
      //           primary: "#191919",
      //         },
      //       },
      //     },
      //   },
      // ],
    }),
  ],
};
