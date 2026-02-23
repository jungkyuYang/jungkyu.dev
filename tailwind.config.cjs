//eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Next.js App Router 기준 경로 추가
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          gray: '#F5F5F7',
          dark: '#1D1D1F',
          blue: '#0071E3',
          green: '#34C759',
          border: 'rgba(0, 0, 0, 0.05)',
        },
      },
      fontFamily: {
        // 변수가 로드되지 않을 경우를 대비해 시스템 폰트 백업 추가
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-calsans)', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in-out forwards',
        title: 'title 1s ease-out forwards',
        'shimmer-text': 'shimmer-text-move 2.2s infinite linear',
        'shimmer-once': 'shimmer-once-move 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'effect-glow': 'effect-glow-anima 5s linear infinite',
        'skeleton-shimmer': 'skeleton-shimmer-move 1.2s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%, 75%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        title: {
          '0%': { 'line-height': '0%', 'letter-spacing': '0.25em', opacity: '0' },
          '80%': { opacity: '1' },
          '100%': { 'line-height': '100%', opacity: '1' },
        },
        'shimmer-text-move': {
          '0%': { 'background-position': '200% 0' },
          '100%': { 'background-position': '-200% 0' },
        },
        'shimmer-once-move': {
          '0%': { left: '-40%', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' },
        },
        'effect-glow-anima': {
          '0%, 40%, 100%': { opacity: '0' },
          '2%, 15%': { opacity: '0.5' },
          '10%': { opacity: '0.7' },
        },
        'skeleton-shimmer-move': {
          '100%': { left: '100%' },
        },
      },
    },
  },
};
