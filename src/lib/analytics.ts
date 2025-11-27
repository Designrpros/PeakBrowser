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

export const trackEvent = ({ action, category, label, value }: GAEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};