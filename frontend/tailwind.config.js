/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        border: "var(--color-border)",
        background: "var(--color-background)",
        foreground: "var(--color-text)",
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-primary)",
        },
        cta: {
          DEFAULT: "var(--color-cta)",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-primary)",
        },
        muted: {
          DEFAULT: "var(--color-primary-light)",
          foreground: "var(--color-text-muted)",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
