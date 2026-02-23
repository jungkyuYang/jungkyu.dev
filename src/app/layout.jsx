import './global.css';

import { Inter } from 'next/font/google';
import LocalFont from 'next/font/local';

import data from '@/shared/constants/data.json';
import AnalyticsProvider from '@/shared/providers/AnalyticsProvider';
import ThemeClientProvider from '@/shared/providers/ThemeClientProvider';
import { LayoutContainer } from '@/widgets/layout/ui/LayoutContainer';

const username = process.env.GITHUB_USERNAME || data.githubUsername;
const displayName = data.displayName || username;

/** @type {import('next').Metadata} */
export const metadata = {
  // 1. 기본 도메인 설정 (상대 경로 이미지를 절대 경로로 자동 변환)
  metadataBase: new URL('https://jungkyu-dev-pro.vercel.app'),

  // 2. 제목 설정 (template 활용)
  title: {
    default: `${displayName} | Frontend Developer Portfolio`,
    template: `%s | ${displayName}`,
  },

  // 3. 설명 및 키워드 (변수 활용)
  description: `프론트엔드 개발자 ${displayName}의 포트폴리오입니다. Next.js로 구축된 다양한 프로젝트와 기술 스택을 확인해보세요.`,
  keywords: [
    displayName,
    '프론트엔드 개발자',
    'Frontend Engineer',
    'React',
    'Next.js',
    '포트폴리오',
  ],
  authors: [{ name: displayName }],
  creator: displayName,

  // 4. 검색 엔진 수집 최적화
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 5. 오픈 그래프 (SNS 공유 최적화)
  openGraph: {
    title: `${displayName}의 포트폴리오`,
    description: `프론트엔드 개발자 ${displayName}의 프로젝트와 성장 기록을 소개합니다.`,
    url: './',
    siteName: `${displayName} 포트폴리오`,
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png', // public 폴더에 위치 필요
        width: 1200,
        height: 630,
        alt: `${displayName} 포트폴리오 대표 이미지`,
      },
    ],
  },

  // 6. 트위터 설정
  twitter: {
    card: 'summary_large_image',
    title: displayName,
    description: `${displayName}의 개발 프로젝트 및 활동을 확인하세요.`,
    images: ['/images/og-image.png'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const calSans = LocalFont({
  src: '../../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${inter.variable} ${calSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeClientProvider>
          <AnalyticsProvider />
          <LayoutContainer>{children}</LayoutContainer>
        </ThemeClientProvider>
      </body>
    </html>
  );
}
