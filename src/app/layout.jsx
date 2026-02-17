import './global.css';
import { Suspense } from 'react';

import { Inter } from 'next/font/google';
import LocalFont from 'next/font/local';

import data from '@/shared/constants/data.json';
import AnalyticsProvider from '@/shared/providers/AnalyticsProvider';
import ThemeClientProvider from '@/shared/providers/ThemeClientProvider';
import { Navigation } from '@/shared/ui/Navigation';

const username = process.env.GITHUB_USERNAME || data.githubUsername;
const displayName = data.displayName || username;

/** @type {import('next').Metadata} */
export const metadata = {
  title: {
    default: `${username}'s portfolio`,
    template: `%s | ${data.displayName}'s portfolio`, // 하위 페이지에서 %s 자리에 타이틀이 들어옵/니다.
  },
  description: `GitHub portfolio for ${displayName} - Explore my projects and tech stacks.`,
  metadataBase: new URL('https://your-portfolio-domain.com'), // 실제 도메인이 있다면 설정 (OG 이미지 경로 기준)
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
  openGraph: {
    title: `${displayName}'s Portfolio`,
    description: `Software Engineer Portfolio built with Next.js`,
    url: './',
    siteName: `${displayName}'s Portfolio`,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${displayName}`,
    description: `Check out my dev projects and activity.`,
  },
  icons: [
    {
      url: '/favicon.ico',
      rel: 'icon',
      sizes: 'any',
      type: 'image/svg+xml',
    },
  ],
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
    <html
      lang="ko"
      className={[inter.variable, calSans.variable].join(' ')}
      suppressHydrationWarning
    >
      <body
        className={`
          bg-white text-black dark:bg-black dark:text-white
          h-screen overflow-hidden flex flex-col
          ${process.env.NODE_ENV === 'development' ? 'debug-screens' : ''}
        `}
      >
        <ThemeClientProvider>
          <AnalyticsProvider />

          <header className="shrink-0">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Suspense fallback={<div className="h-16 w-full" />}>
                <Navigation />
              </Suspense>
            </div>
          </header>

          <main className="flex-1 min-h-0 overflow-y-auto">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 h-full flex flex-col pt-4">
              {children}
            </div>
          </main>
        </ThemeClientProvider>
      </body>
    </html>
  );
}
