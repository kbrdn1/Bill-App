/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: '#42d392',
        primary2: '#2a9d8f',
        secondary: '#d28741',
        dark: '#1a1a1a',
        dark2: '#2a2a2a',
        light: '#f5f5f5',
      },
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
      },
    }
  },
  plugins: []
}
