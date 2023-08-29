/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        freckleface: ['"Freckle Face"', 'cursive'],
        flamenco: ['Flamenco', 'cursive'],
        chicle: ['Chicle', 'cursive'],
        mynerve: ['Mynerve', 'cursive'],
        dhand: ['"Delicious Handrawn"'],
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};
