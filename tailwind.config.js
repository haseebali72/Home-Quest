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
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

