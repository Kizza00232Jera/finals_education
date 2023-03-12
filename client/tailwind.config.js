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
      'power-gray':'#858585',
      'smoke-gray': '#A4A4A4',
      'soft-gray': '#DEDEDE',
      'invisible-gray': '#F5F5F5',
      'white': '#FFFFFF',
      'gray': '#F9F9F9',
      'blue-hover':'#F4F6FE'
    },
    extend: {
      spacing: {
        '500': '500px',
        '233': '233px',
        
      },
      inset: {
        '281': '281px'
      }
    },
    minWidth: {
      '400': '40%',
    }
  }
}
