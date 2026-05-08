import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-bg": "#FFFFFF",
        "brand-headline": "#3924D9",
        "brand-text": "#5E5E5E",
      },
    },
  },
};

export default config;
