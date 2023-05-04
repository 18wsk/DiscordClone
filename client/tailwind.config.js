/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        "primary": "#313338",
				"secondary": "#2b2d31",
        "tertiary": "#232428",
				"accent": "#7289DA",
				"neutral": "#DCDDDE",
				"base-100": "#FFFFFF",
				"info": "#4E5D94",
				"success": "#3AA655",
				"warning": "#FAA61A",
				"error": "#ED424A"
      },
    },
  },
  plugins: [
    // require('tailwind-scrollbar-hide'),
    // require('tailwindcss-bg-patterns')
  ],
}


