/** @type {import('tailwindcss').Config} */
// Maison Karima design tokens (reference: dark editorial hero, cream sections, olive band).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#EFEAE2',      // cream page background
        paper: '#F7F4EE',      // lighter card surface
        sand: '#E2DACD',       // borders / soft fills
        taupe: '#8F8671',      // muted text, eyebrows
        brown: '#2A2620',      // body / heading text
        charcoal: '#1A1814',   // dark sections, hero overlay
        olive: { DEFAULT: '#4B5236', dark: '#3A4029' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { widest2: '0.22em', wide3: '0.32em' },
      boxShadow: { float: '0 24px 60px -20px rgba(26,24,20,0.45)' },
    },
  },
  plugins: [],
};
