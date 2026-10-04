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
        surface: "#F4F6F8",
        border: "#E2E8F0",
        ink: {
          DEFAULT: "#32373C",
          soft: "#1E293B",
          muted: "#526072",
        },
        /* token name `cyan` kept for fewer file edits — value is corporate blue #1E5BB8 */
        cyan: {
          DEFAULT: "#1E5BB8",
          50: "#EEF3FB",
          100: "#D6E3F5",
          500: "#1E5BB8",
          600: "#184A96",
          700: "#133B78",
        },
        navy: "#0F2A4F",
        /* Layout surfaces (ledeksan-style rhythm, ARLEDSCREEN palette) */
        bar: "#EEF2F7",
        band: "#F2F4F7",
        foot: "#0D2240",
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
        card: "0 1px 2px rgba(15, 42, 79, 0.04), 0 4px 16px rgba(15, 42, 79, 0.06)",
        "glow-amber": "0 10px 30px rgba(201, 120, 32, 0.15)",
        hero: "0 30px 60px -28px rgba(13, 34, 64, 0.5), 0 12px 24px -12px rgba(13, 34, 64, 0.2)",
        tile: "0 18px 40px -24px rgba(19, 59, 120, 0.55)",
        pill: "0 6px 16px -8px rgba(13, 34, 64, 0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(226,232,240,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,232,240,0.9) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};

export default config;
