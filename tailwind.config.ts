import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#F15A22",
        "orange-light": "#FF7A45",
        black: "#0A0A0A",
        dark: "#111111",
        dark2: "#181818",
        white: "#FFFFFF",
        grey: "#888888",
      },
      fontFamily: {
        heading: ["Bebas Neue", "sans-serif"],
        body: ["Barlow", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
