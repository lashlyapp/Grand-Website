import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1a1a",
        gold: "#b8924e",
        "gold-dark": "#9a7838",
      },
    },
  },
  plugins: [],
};

export default config;
