import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The Cupertino Hotel shares the sister property's design system but
        // wears its own skin: where The Grand (Sunnyvale) is warm and boutique,
        // Cupertino is cooler, cleaner and more contemporary — fitting a hotel
        // directly across from Apple Park. Same token names, distinct values,
        // so the whole site re-skins without structural changes.
        ink: {
          DEFAULT: "#15171c", // cool charcoal (vs the Grand's warm near-black)
          soft: "#252934",
        },
        cream: "#f5f6f8", // cool off-white (vs the Grand's warm cream)
        sand: "#e7ebef", // cool stone (vs the Grand's warm sand)
        // Accent: a deeper, cooler antique brass — distinct from the Grand's
        // lighter warm bronze, and dark enough to read cleanly on the cool
        // neutrals. Token stays "gold" so the shared components don't change.
        gold: {
          DEFAULT: "#9c7b3c",
          dark: "#856634",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
