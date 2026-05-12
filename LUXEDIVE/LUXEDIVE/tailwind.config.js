/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          gold: "#D4AF37",    // Primary Accent
          "gold-light": "#F4C430",
          "gold-dim": "#AA8C2C",
          black: "#0B0D10",   // Primary Background (Deep Black + Blue tone)
          dark: "#12151A",    // Secondary Background (Cards)
          surface: "#161A20", // Panels
          gray: "#9CA3AF",    // Text Secondary / Silver
          white: "#E5E7EB",   // Text Primary (Near White)
          blue: "#3B82F6",    // Secondary Accent (Electric Blue)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
