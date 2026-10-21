import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        surface: "#F7F9FC",
        border: "#D8E2EE",
        ink: {
          DEFAULT: "#32373C",
          soft: "#32373C",
          muted: "#32373C",
        },
        /* token name `cyan` kept for fewer file edits — value is corporate blue #1E5BB8 */
        cyan: {
          DEFAULT: "#1E5BB8",
          50: "#F7F9FC",
          100: "#F7F9FC",
          500: "#1E5BB8",
          600: "#1E5BB8",
          700: "#1E5BB8",
        },
        navy: "#0B1B33",
        /* Layout surfaces (ledeksan-style rhythm, ARLEDSCREEN palette) */
        bar: "#F7F9FC",
        band: "#F7F9FC",
        foot: "#0B1B33",
        pill: "#F7F9FC",
        amber: {
          DEFAULT: "#C97820",
          500: "#C97820",
          600: "#A86218",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        card: "1.5rem",
        hero: "2.25rem",
      },
      letterSpacing: {
        display: "-0.02em",
      },
      boxShadow: {
        glow: "0 10px 30px rgba(30, 91, 184, 0.18)",
        card: "0 1px 2px rgba(11, 27, 51, 0.04), 0 4px 16px rgba(11, 27, 51, 0.06)",
        "glow-amber": "0 10px 30px rgba(201, 120, 32, 0.15)",
        hero: "0 30px 60px -28px rgba(11, 27, 51, 0.5), 0 12px 24px -12px rgba(11, 27, 51, 0.2)",
        tile: "0 18px 40px -24px rgba(30, 91, 184, 0.55)",
        pill: "0 6px 16px -8px rgba(11, 27, 51, 0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(216, 226, 238,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(216, 226, 238,0.9) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};

export default config;
