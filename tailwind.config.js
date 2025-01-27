module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx}",
    "./Components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        softwareBox:" rgba(215, 243, 254, 0.25) 0px 30px 60px -12px inset,rgba(215, 243, 254, 0.3) 0px 18px 36px -18px inset,rgba(215, 243, 254, 0.3) 0px 18px 36px -18px, rgba(215, 243, 254, 0.25) 0px 30px 60px -12px",
        socialMediaBox: "rgba(255, 255, 255, 0.25) 0px 54px 55px,rgba(255, 255, 255, 0.12) 0px -12px 30px,rgba(255, 255, 255, 0.12) 0px 4px 6px,rgba(255, 255, 255, 0.17) 0px 12px 13px,rgba(255, 255, 255, 0.09) 0px -3px 5px",
        custom: "rgba(255, 255, 255, 0.3) 0px 5px 15px, rgba(255, 255, 255, 0.5) 0px 5px 15px", // Add the custom shadow
        profileBoxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        fontFamily: {
          'bebas': ['"Bebas Neue"', 'sans-serif'],
          'merriweather': ['"Merriweather"', 'serif'],
          'montserrat': ['"Montserrat"', 'sans-serif'],
          'open-sans': ['"Open Sans"', 'sans-serif'],
          'orbitron': ['"Orbitron"', 'sans-serif'],
          'oswald': ['"Oswald"', 'sans-serif'],
          'outfit': ['"Outfit"', 'sans-serif'],
          'playfair': ['"Playfair Display"', 'serif'],
          'roboto': ['"Roboto"', 'sans-serif'],
        },
      },
      keyframes: {
        slowspin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spin: "slowspin 3s linear infinite", // Adjust duration (5s here) as desired
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        bounce: "bounce 5s infinite",
      },
      keyframes: {
        float: {
          "0%": {
            transform: "translateY(0px)"
          },
          "50%": {
            transform: "translateY(-10px)"
          },
          "100%": {
            transform: "translateY(0px)"
          }
        },
      },
      animation:{
        float:"float 3s ease-in-out infinite"
      }
    },
  },
  plugins: [],
};
