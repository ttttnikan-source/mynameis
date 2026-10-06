/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#082B4C',
          50: '#E8EFF5',
          100: '#C7D6E3',
          200: '#9FB8CE',
          300: '#6E8FB2',
          400: '#4A6F96',
          500: '#2E5478',
          600: '#1A4063',
          700: '#0E3A63',
          800: '#082B4C',
          900: '#051A2E',
          950: '#02101F',
        },
        gold: {
          DEFAULT: '#C9A45C',
          light: '#D9BC7A',
          dark: '#A8853E',
          50: '#FAF5EA',
          100: '#F3E9D2',
        },
        mist: '#EEF4F8',
        offwhite: '#F7F8FA',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 24px -4px rgba(8, 43, 76, 0.08)',
        'card-hover': '0 16px 48px -8px rgba(8, 43, 76, 0.18)',
        'nav': '0 2px 20px -4px rgba(8, 43, 76, 0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
