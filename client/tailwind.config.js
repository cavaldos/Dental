/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{html,js,jsx}",
    "./src/components/**/*.{html,js,jsx}",
  ],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif", "ui-sans-serif", "system-ui"],
        montserrat: ["Montserrat", "sans-serif", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#0D6EFD",
        secondary: "#6C757D",
        success: "#198754",
        danger: "#DC3545",
        warning: "#FFC107",
        info: "#0DCAF0",
        blu: "blue",
        ret: "red",
        grin: "#24A65F",
        'grey': "#ACACAC",
        '#4B4B4B':'#4B4B4B'
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      borderRadius: {
        xl: "0.7rem", /* 12px */
      },
      padding: {
        '2': '0.5rem',
      },
    },
  },
  plugins: [],
};
