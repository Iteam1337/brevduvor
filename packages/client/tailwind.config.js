module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'gainsboro',
      },
      width: {
        '350': '350px',
      },
      minWidth: {
        '350': '350px',
      },
      inset: {
        '1': '8px',
        '2': '12px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
        '1/2': '50%',
      },
    },
    translate: {
      // defaults to {}
      '1/2': '50%',
      '-1/2': '-50%',
      full: '100%',
    },
  },

  variants: {},
  plugins: [require('tailwindcss-transforms')()],
}
