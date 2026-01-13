import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx}'],

  theme: {
    extend: {
      // 1. Apple 스타일 색상 추가
      colors: {
        apple: {
          gray: '#F5F5F7', // 배경색
          dark: '#1D1D1F', // 메인 텍스트 및 다크 카드
          blue: '#0071E3', // 강조 버튼/링크
          green: '#34C759', // GA 지표/성공 상태
          border: 'rgba(0, 0, 0, 0.05)', // 아주 연한 카드 테두리
        },
      },
      // 2. Apple 특유의 부드러운 곡률 정의
      borderRadius: {
        apple: '32px',
        'apple-lg': '40px',
      },
      // 3. 5단 벤토 그리드를 위한 설정
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
        // 4. GA 실시간 점멸 애니메이션 추가
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
