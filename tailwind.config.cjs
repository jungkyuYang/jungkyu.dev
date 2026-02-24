//eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
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
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-calsans)', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        // 기존 애니메이션 유지
        'fade-in': 'fade-in 1s ease-in-out forwards',
        title: 'title 1s ease-out forwards',
        'shimmer-text': 'shimmer-text-move 2.2s infinite linear',
        'shimmer-once': 'shimmer-once-move 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'effect-glow': 'effect-glow-anima 5s linear infinite',
        'skeleton-shimmer': 'skeleton-shimmer-move 1.2s infinite',

        // [추가] 로딩 스피너 전용: 0.5초 전체 실행 시간 중 앞의 0.3초(60%)를 숨김
        'spinner-in': 'spinner-in 0.5s ease-in-out forwards',
      },
      keyframes: {
        // [추가] 0.3초 룰을 위한 키프레임 (0.5s * 0.6 = 0.3s)
        'spinner-in': {
          '0%, 60%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
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
