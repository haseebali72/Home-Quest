/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        'custom-range' :  {'min' : '600px', "max" : "800px"}
      },
      aspectRatio : {
        '5/2' : '5 / 2',
        '10/6' : '10 / 6'
      },
      transitionProperty : {
        "translate" : "translate"

      },
      backgroundColor:{
        "2e9132" : "#2e9132"
      },
      width : {
        "86" : "23rem"
      },
      fontFamily : {
        "sans" : ['Helvetica', 'Arial', 'sans-serif'],
      }
      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

