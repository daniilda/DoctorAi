import tailwindThemer from "tailwindcss-themer";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: "768px",
      lg: "1024px",
    },
    extend: {},
  },
  plugins: [
    tailwindThemer({
      defaultTheme: {
        name: "light",
        extend: {
          colors: {
            primary: "blue",
            text: {
              main: "#282828",
            },
            bg: {
              primary: "#F6F5FC",
              nav: "",
            },
          },
        },
      },
      themes: [
        {
          name: "dark",
          extend: {
            colors: {
              primary: "red",
              bg: {
                primary: "#191919",
              },
            },
          },
        },
      ],
    }),
  ],
};
