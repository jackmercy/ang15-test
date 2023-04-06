/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("postcss-import"),
    require("autoprefixer"),
    require("tw-elements/dist/plugin"),
    require('flowbite/plugin')
  ]
}

