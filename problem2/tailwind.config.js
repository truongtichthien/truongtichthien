/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'btn-primary': 'linear-gradient(150deg, #5943c8 0%, #6a82ff 100%)',
        'gradient-ember-cyan': 'linear-gradient(170deg, #ff2999 10%, #0cF 90%)',
        'gradient-skyblue-orange':
          'linear-gradient(45deg, #affaff 0%, #9aa4ff 49.5%, #ffb7a0 100%)',
      },
    },
  },
  plugins: [],
};
