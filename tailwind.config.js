module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1170px',
        '2xl': '1496px',
      },

      rotate: {
        '360': '360deg',
      },
      spacing: {
        '126': '31.5rem',
      }
    },
  },
  plugins: [],
}

