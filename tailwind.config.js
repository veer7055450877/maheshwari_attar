/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A", // Absolute Black
          gold: "#C8A349",  // Royal Gold
          ivory: "#F4F1EC", // Soft Ivory
          oud: "#2C1E14",   // Deep Oud Brown
          charcoal: "#1A1A1A",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["'Montserrat'", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-gradient': 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 100%)',
      },
      animation: {
        'slow-spin': 'spin 20s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      letterSpacing: {
        'widest-xl': '0.3em',
        'widest-2xl': '0.5em',
      }
    },
  },
  plugins: [],
}
