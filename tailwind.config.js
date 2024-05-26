/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      'sm':{'max':'480px'},
      'md':{'max':'768px'},
      'lg':{'max':'992px'},
      'xl':{'max':'1200px'},
      'xxl':{'max':'1440px'}
    }
  },
  plugins: [],
}

