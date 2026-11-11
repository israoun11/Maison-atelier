/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4EF',
        sand: '#EAE3D9',
        taupe: '#B6A898',
        brown: '#40372F',
        charcoal: '#262421',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { widest2: '0.22em' },
    },
  },
  plugins: [],
};
