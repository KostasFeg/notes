module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        xs: {
          css: {
            fontSize: '0.7rem',
            h1: {
              fontSize: '1rem',
            },
          },
        },
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'checked'],
    extend: {},
  },
  plugins: [require('@tailwindcss/typography', require('@tailwindcss/forms'))],
};
