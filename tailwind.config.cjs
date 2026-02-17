// 1. import 대신 require를 사용해야 합니다. (CJS 규칙)
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // src 폴더 내의 모든 파일을 감시하도록 경로 설정 확인
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      // Apple 스타일 색상
      colors: {
        apple: {
          gray: '#F5F5F7',
          dark: '#1D1D1F',
          blue: '#0071E3',
          green: '#34C759',
          border: 'rgba(0, 0, 0, 0.05)',
        },
      },
      // Apple 곡률
      borderRadius: {
        apple: '32px',
        'apple-lg': '40px',
      },
      // 5단 벤토 그리드
      gridTemplateColumns: {
        5: 'repeat(5, minmax(0, 1fr))',
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
      fontFamily: {
        // defaultTheme을 require로 가져왔으므로 정상 작동합니다.
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-calsans)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fade-in 1s ease-in-out forwards',
        title: 'title 1s ease-out forwards',
        'fade-left': 'fade-left 1s ease-in-out forwards',
        'fade-right': 'fade-right 1s ease-in-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0%' },
          '75%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
        'fade-left': {
          '0%': { transform: 'translateX(100%)', opacity: '0%' },
          '30%': { transform: 'translateX(0%)', opacity: '100%' },
          '100%': { opacity: '0%' },
        },
        'fade-right': {
          '0%': { transform: 'translateX(-100%)', opacity: '0%' },
          '30%': { transform: 'translateX(0%)', opacity: '100%' },
          '100%': { opacity: '0%' },
        },
        title: {
          '0%': { 'line-height': '0%', 'letter-spacing': '0.25em', opacity: '0' },
          '25%': { 'line-height': '0%', opacity: '0%' },
          '80%': { opacity: '100%' },
          '100%': { 'line-height': '100%', opacity: '100%' },
        },
      },
    },
  },
  plugins: [],
};
