/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        henna: {
          DEFAULT: '#5A1E1B',
          deep: '#2C0C0B',
          dark: '#3D1311',
          light: '#7A2A26',
          soft: '#A24A45',
        },
        mehndi: {
          DEFAULT: '#3F4A2A',
          dark: '#2A321C',
          light: '#5A693D',
          muted: '#738356',
        },
        ivory: {
          DEFAULT: '#F7F1E6',
          light: '#FCF9F3',
          warm: '#EFE7D8',
          muted: '#E3D7C3',
        },
        gold: {
          DEFAULT: '#B8893A',
          light: '#D4A85B',
          dark: '#8C6524',
          subtle: '#E7CFA5',
        },
        charcoal: {
          DEFAULT: '#231F1C',
          muted: '#4A433E',
          soft: '#766D66',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
        accent: ['"Great Vibes"', 'cursive'],
        vibes: ['"Great Vibes"', 'cursive'],
      },
      letterSpacing: {
        editorial: '0.2em',
        refined: '0.08em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B8893A 0%, #D4A85B 50%, #8C6524 100%)',
        'henna-gradient': 'linear-gradient(135deg, #5A1E1B 0%, #3D1311 100%)',
      },
      boxShadow: {
        'fine': '0 1px 3px rgba(35, 31, 28, 0.04), 0 1px 2px rgba(35, 31, 28, 0.02)',
        'editorial': '0 20px 40px -15px rgba(35, 31, 28, 0.07)',
        'gold': '0 10px 30px -10px rgba(184, 137, 58, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 55s linear infinite',
      },
    },
  },
  plugins: [],
};

