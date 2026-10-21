/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"Courier Prime"', '"Courier New"', 'monospace'],
      },
      colors: {
        paper:  'var(--paper)',
        paper2: 'var(--paper-2)',
        rule:   'var(--rule)',
        ink:    'var(--ink)',
        ink2:   'var(--ink-2)',
        ink3:   'var(--ink-3)',
        stamp:  'var(--stamp)',
      },
    },
  },
  plugins: [],
}
