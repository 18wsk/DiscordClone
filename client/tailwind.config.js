/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        "primary": "#313338",
				"secondary": "#2b2d31",
        "tertiary-2": "#1E1F22",
        "tertiary": "#232428",
				"accent": "#7289DA",
				"neutral": "#DCDDDE",
				"base-100": "#FFFFFF",
				"info": "#4E5D94",
				"success": "#3AA655",
				"warning": "#FAA61A",
				"error": "#ED424A"
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        messgeName: ['16px', '22px'],
        messageTime: ['12px', '22px'],
        profileName: ['14px', '18px'],
        profileId: ['12px', '13px'],
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide'),
    // require('tailwindcss-bg-patterns')
    
  ],
}


