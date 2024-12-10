import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        black: "#2F2F2F",
        white: "#F8F6F2",
        grey: "#585858",
      },
      fontFamily: {
        sans: ["var(--font-enduro)"],
        serif: ["var(--font-cardinalPhoto)"],
      },
    },
  },
  plugins: [],
};
export default config;
