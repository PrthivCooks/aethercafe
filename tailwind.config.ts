import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        coffee: {
          900: "#1E1A17",
          800: "#2B2621",
          700: "#38312B",
          500: "#8C715A",
          400: "#B89B82",
          200: "#E3D3C5",
        },
        gold: {
          500: "#D4AF37",
          400: "#E2C364",
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      }
    },
  },
  plugins: [],
};
export default config;
