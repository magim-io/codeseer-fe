/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        bottom_shadow:
          'rgba(0, 0, 0, 0.1) 0px 6px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
        welcome_btn: '0px 6px 22px rgba(0, 0, 0, 0.1);',
      },
      colors: {
        navy: '#1C3879',
        primary_blue: '#607EAA',
        beige: '#EAE3D2',
        winter: '#F9F5EB',
        drark_blue: '#0A2647',
        dark_blue_2: '#144272',
        dark_blue_3: '#205295',
        dark_blue_4: '#2C74B3',
        md_blue: '#144272',
        light_gray: '#FAFBFC',
        primary: '#42526E',
        primary_text: '#172b4d',
      },
    },
  },
  plugins: [],
};
