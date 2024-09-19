/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
    
      'medium-screen': {'min': '768px', 'max': '1199px'},
	    'mobile': {'max': '767px'},
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        ferry: ["Ferry", "sans-serif"],
      },
      fontSize: {
        min: ["10px", "12.1px"],
        main: ["14px", "16.94px"],
      },
      backgroundImage: {
        'burger-menu': "url('./icons/burger-menu.svg')",
        'burger-close': "url('./icons/burger-close.svg')",
      },
      colors: {

        "basic-blue": {
          DEAFULT: "#029491",
          
        },
        "basic-black": {
          DEAFULT: "#000000",
          40: "rgba(0, 0, 0, 0.4)",
          70: "rgba(0, 0, 0, 0.7)"
        },
        "basic-white": {
          DEAFULT: "#FFFFFF",
        },

        "second-orange": {
          DEFAULT: "#FFB64F"
        },
        "second-light-blue":{
          DEAFULT: "#7CE3E1",
        },
        "second-blue": {
          DEFAULT: "#5970FF",
          
        },
        
      },
    },
  },
  plugins: [],
}

