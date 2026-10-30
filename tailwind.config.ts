import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)"],
        body: ["var(--font-jakarta)"],
        display: ["var(--font-lora)"],
        serif: ["var(--font-lora)"],
        arabic: ["var(--font-amiri)"],
      },
    },
  },
  plugins: [],
};

export default config;
