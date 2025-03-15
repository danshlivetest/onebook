const { join } = require('path')

/** @return {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, './src/**/!(*.stories|*.spec).{ts,html}')],
  important: true,
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005CBB'
        },
        blue: {
          DEFAULT: '#005CBB',
          
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
