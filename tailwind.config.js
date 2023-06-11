const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      'sans': ['Chivo', 'sans-serif'], // overriding 'sans' familiy with 'chivo'(desired) because its called as default in all the text
    },
    extend: {
      colors: {
        'yellow-main': '#FFDA80',
        'gray-main': '#F3F3F2',
        'red-main': '#FF8173',
        'blue-main': '#5989FF',
        'black-main': '#170D21',
        'purple-main': '#A573FF',
        'green-mian': '#7FFF94',
        'pink-main':  '#FFB1CD',
        'orange-main':  '#FF9C66',
        'teal-main': '#64FFD1'
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}