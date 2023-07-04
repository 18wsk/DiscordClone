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
        _2xl: ['28px', '36px'],
        _3xl: ['32px', '40px'],
        messgeName: ['16px', '22px'],
        messageTime: ['12px', '22px'],
        profileName: ['14px', '18px'],
        profileId: ['12px', '13px'],
        threadText: ['14px', '24px'],
      },
      screens: {
        'xs': '0px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }  
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }  
        }
      },
      animation: {
        typing: "typing 2s steps(20) 2000ms infinite alternate, blink .7s infinite"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}


