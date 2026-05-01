import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#C6A667',
        'gold-light': '#f5d78e',
        'gold-dark': '#8B6914',
        cream: '#F1EEE7',
        dark: '#131311',
        'dark-2': '#1c1c1a',
        'dark-3': '#242420',
        warmcream: '#EDE4DD',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        bounce_slow: 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
