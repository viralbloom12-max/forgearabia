import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        navy: {
          DEFAULT: "#080B24",
          50: "#E7E8EF",
          800: "#0C1030",
          900: "#080B24",
          950: "#05071A",
        },
        electric: {
          DEFAULT: "#6C3BFF",
          soft: "#8B63FF",
          deep: "#4E22D6",
        },
        neon: {
          DEFAULT: "#00B8FF",
          soft: "#4FD0FF",
          deep: "#0090CC",
        },
        silver: {
          DEFAULT: "#C9CED8",
          muted: "#8A90A0",
          faint: "#5B6172",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        // Restrained, elegant glow (not crypto/gaming)
        "glow-electric": "0 0 0 1px rgba(108,59,255,0.20), 0 12px 40px -12px rgba(108,59,255,0.35)",
        "glow-neon": "0 0 0 1px rgba(0,184,255,0.20), 0 12px 40px -12px rgba(0,184,255,0.30)",
        "card": "0 1px 0 0 rgba(201,206,216,0.06) inset, 0 20px 50px -24px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #6C3BFF 0%, #00B8FF 100%)",
        "radial-glow": "radial-gradient(60% 60% at 50% 0%, rgba(108,59,255,0.16) 0%, rgba(8,11,36,0) 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
