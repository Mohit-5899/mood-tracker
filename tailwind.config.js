/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f5ff",
          100: "#e5edff", 
          200: "#cddbff",
          300: "#b4c9ff",
          400: "#8da5ff",
          500: "#6675ff",
          600: "#5551f8",
          700: "#4a3ae0",
          800: "#3c2dbd",
          900: "#312e81",
          950: "#1e1b4b",
        },
        secondary: {
          50: "#ebfeff",
          100: "#d6faff",
          200: "#b3f5fe", 
          300: "#85eefa",
          400: "#43d5f5",
          500: "#22b8ea",
          600: "#0c99d0",
          700: "#0d7aa8",
          800: "#11658a",
          900: "#134e4a",
          950: "#042f2e",
        },
        mood: {
          great: "#66dd4a", // Brighter lime
          good: "#00d4b1", // Vivid teal
          neutral: "#7b5dfa", // Vibrant purple
          bad: "#ff9e2c", // Warm orange
          awful: "#ff5274", // Pink-red
        },
        dark: {
          100: "#d5d7e0",
          200: "#acaebf",
          300: "#8c8fa3",
          400: "#666980",
          500: "#4d4f66",
          600: "#34354a",
          700: "#292a3d",
          800: "#141625",
          900: "#0c0e1b",
          950: "#06070f",
        },
        accent: {
          purple: "#9d63ff",
          blue: "#0095ff",
          pink: "#ff4ecd",
          yellow: "#ffcc48",
          cyan: "#0ae2ff",
        },
        slate: {
          850: "#172033", // Custom slate color between 800 and 900
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 20px rgba(123, 93, 250, 0.6)',
        'glow-lg': '0 0 30px rgba(123, 93, 250, 0.7)',
        'glow-cyan': '0 0 20px rgba(10, 226, 255, 0.6)',
        'glow-teal': '0 0 20px rgba(0, 212, 177, 0.6)',
        'glow-lime': '0 0 20px rgba(102, 221, 74, 0.6)',
        'glow-orange': '0 0 20px rgba(255, 158, 44, 0.6)',
        'glow-red': '0 0 20px rgba(255, 82, 116, 0.6)',
        'glow-purple': '0 0 20px rgba(157, 99, 255, 0.6)',
        'glow-pink': '0 0 20px rgba(255, 78, 205, 0.6)',
        'card': '0 8px 24px rgba(12, 14, 27, 0.25)',
        'card-hover': '0 12px 32px rgba(12, 14, 27, 0.35)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.8, filter: 'brightness(1)' },
          '50%': { opacity: 1, filter: 'brightness(1.2)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      backdropBlur: {
        xs: '2px',
        md: '8px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}; 