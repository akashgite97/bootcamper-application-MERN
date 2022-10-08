/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      colors:{
        brightRed:'hsl(12,88%,59%)',
        brightRedLight:'hsl(12,88%,69%)',
        brightRedSubLight:'hsl(12,88%,95%)',
        darkBlue:'hsl(228,39%,23%)',
        darkGrayBlue:'hsl(227,12%,61%)',
        veryDarkBlue:'hsl(223,12%,13%)',
        veryPaleRed:'hsl(13,100%,96%)',
        veryLightGray:'#616161',
        gray:'#E5E4E2',
        black:'#000'
      }
    },
  },
  plugins: [],
}