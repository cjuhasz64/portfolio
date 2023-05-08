/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0.0deg)' },
          '5%': { transform: 'rotate(14deg)' },
          '10%': { transform: 'rotate(-8deg)' },
          '15%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-4deg)' },
          '25%': { transform: 'rotate(10.0deg)' },
          '30%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        'wiggle': 'wiggle 3s linear infinite',
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
        '40': 'repeat(40, minmax(0, 1fr))',
      },
      fontFamily: {
        'worksans': ['Work Sans', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']
      },
    },
  },
  variants: {
    height: ['responsive', 'hover', 'focus']
  },
  plugins: [],
}

