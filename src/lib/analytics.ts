// src/lib/analytics.ts

export const GA_CATEGORY = {
  BROWSER: 'Browser UI',
  SEARCH: 'Search',
  KANBAN: 'Kanban Board',
  DOWNLOAD: 'Conversion',
  NAVIGATION: 'Navigation',
  DOCS: 'Documentation',
  EXTERNAL: 'External Link'
};

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// 1. Extend the global Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: unknown;
      }
    ) => void;
  }
}

export const trackEvent = ({ action, category, label, value }: GAEvent) => {
  // 2. Now you can access window.gtag directly without casting to 'any'
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};