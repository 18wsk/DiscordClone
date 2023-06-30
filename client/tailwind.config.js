/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      Inter: ['Inter', "sans-serif"],
      Orbitron: ['Orbitron', "sans-serif"],
      Bebas: ['Bebas Neue', "sans-serif"]
    },
    extend: {
      colors: {
        "primary": "#313338",
        "secondary": "#2b2d31",
        "tertiary": "#232428",
				"accent": "#3e47c9",
        "accent-hover": "#7289DA",
				"info": "#4E5D94",
				"success": "#3AA655",
				"warning": "#FAA61A",
				"error": "#ED424A"
      },
      fontSize: {
        _2xs: ['8px', '12px'],
        xs: ['10px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        messgeName: ['16px', '22px'],
        messageTime: ['12px', '22px'],
        profileName: ['14px', '18px'],
        profileId: ['12px', '13px'],
      },
      screens: {
        'xs': '0px',
        // => @media (min-width: 375px) { ... }
  
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
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    // require('tailwindcss/plugins/bgOpacity'), 
  ],
}


