/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg:     'var(--bg)',
        bg2:    'var(--bg-2)',
        bg3:    'var(--bg-3)',
        bg4:    'var(--bg-4)',
        tx:     'var(--tx)',
        tx2:    'var(--tx-2)',
        tx3:    'var(--tx-3)',
        ac:     'var(--ac)',
        ac2:    'var(--ac2)',
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
}
