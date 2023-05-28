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
              disabled: "#BDBDBD",
            },
            border: {
              main: "#FFFFFF",
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
              disabled: "#c3c3c3",
              lighter: "#F6F5FC",
            },
          },
        },
      },
      themes: [
        {
          name: "dark",
          extend: {
            colors: {
              primary: "#6DB49B",
              primaryLighter: "#7AC5AA",
              error: "#BF5552",
              text: {
                main: "#FFFFFF",
                secondary: "#BDBDBD",
                placeholder: "#8A8A8A",
                onPrimary: "#FFFFFF",
                disabled: "#BDBDBD",
              },
              border: {
                main: "#4A4A4A",
              },
              status: {
                ok: "#6DB49B",
                warning: "#DE8839",
                error: "#BF5552",
              },
              bg: {
                primary: "#282828",
                accent: "#1E1E1E",
                nav: "#1E1E1E",
                disabled: "#a3a3a3",
                lighter: "#3a3a3a",
              },
            },
          },
        },
      ],
    }),
  ],
};
