'use client';
import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

const GA_MEASUREMENT_ID = 'G-3SJJSW4ND6';

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
