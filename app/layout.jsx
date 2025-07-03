import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import Script from "next/script";
import data from "../data.json";
import AnalyticsProvider from "./_providers/AnalyticsProvider";
import ThemeClientProvider from "./_providers/ThemeClientProvider";

const username = process.env.GITHUB_USERNAME || data.githubUsername;
const displayName = data.displayName || username;

/** @type {import('next').Metadata} */
export const metadata = {
  title: {
    default: [username, "'s portfolio"].join(""),
    template: "%s | " + data.displayName + "'s portfolio",
  },
  description: "GitHub portfolio for " + displayName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      sizes: "any",
      type: "image/svg+xml",
    },
  ],
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VMP41WGVX2"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VMP41WGVX2');
          `}
        </Script>
      </head>
      <body
        className={`bg-white text-black dark:bg-zinc-900 dark:text-white ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        <ThemeClientProvider>
          <AnalyticsProvider />
          {children}
        </ThemeClientProvider>
      </body>
    </html>
  );
}
