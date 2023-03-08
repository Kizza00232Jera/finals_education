/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'primary': '#224AFA',
      'secondary':'#AD8634',
      'primary-light': '#4B6BFB',
      'secondary-light': '#DEAD43',
      'info': '#4B6BFB',
      'success': '#04A777',
      'warning': '#FFB800',
      'error': '#F8403A	',
      'rich-gray':'#505050',
      'power-gray':'#858585'
    },
    extend: {
      spacing: {
        '500': '500px'
      }
    }
  }
}
