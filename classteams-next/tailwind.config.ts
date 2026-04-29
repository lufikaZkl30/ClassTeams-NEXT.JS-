import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "on-primary": "#ffffff",
        "primary-container": "#DBEAFE",
        "on-primary-container": "#1E40AF",
        secondary: "#475569",
        "on-secondary": "#ffffff",
        "secondary-container": "#F1F5F9",
        "on-secondary-container": "#334155",
        tertiary: "#0F172A",
        "on-tertiary": "#ffffff",
        background: "#F8FAFC",
        "on-background": "#0F172A",
        surface: "#ffffff",
        "on-surface": "#0F172A",
        "surface-variant": "#F1F5F9",
        "on-surface-variant": "#475569",
        outline: "#CBD5E1",
        "outline-variant": "#E2E8F0",
        error: "#EF4444",
        "surface-container-low": "#F8FAFC",
        "surface-container": "#F1F5F9",
        "surface-container-high": "#E2E8F0",
        "surface-container-highest": "#CBD5E1",
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
