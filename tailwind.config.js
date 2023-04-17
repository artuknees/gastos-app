const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}