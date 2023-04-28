/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      screens: {
        tall: { raw: "(min-height: 668px)" },
      },
    },
  },
};
