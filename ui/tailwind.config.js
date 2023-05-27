import tailwindThemer from "tailwindcss-themer";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "512px",
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
              secondary: "#5C5C5C",
              placeholder: "#828397",
              onPrimary: "#FFFFFF",
            },
            status: {
              ok: "#6DB49B",
              warning: "#DE8839",
              error: "#BF5552",
            },
            bg: {
              primary: "#F6F5FC",
              accent: "#FFFFFF",
              nav: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
