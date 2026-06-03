'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics } from '@/config/analytics';
import { logEvent } from 'firebase/analytics';

export function useDashboardAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = async () => {
      const analytics = await initAnalytics();
      if (analytics) {
        logEvent(analytics, 'page_view', {
          page_path: pathname,
          page_title: document.title,
        });
      }
    };
    
    trackPageView();
  }, [pathname]);
}
