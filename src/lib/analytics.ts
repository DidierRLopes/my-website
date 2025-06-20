// Simple analytics helper that works with Google Tag Manager (gtag) or falls back to console.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[] & { push: (...args: unknown[]) => void };
  }
}

export function trackEvent(action: string, label?: string, value?: number) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', action, {
      event_category: 'Intelligence',
      event_label: label,
      value,
    });
  } else if (window.dataLayer) {
    window.dataLayer.push({
      event: action,
      event_category: 'Intelligence',
      event_label: label,
      value,
    });
  } else {
    // Fallback: log to console so nothing silently fails during development
    // eslint-disable-next-line no-console
    console.debug('[Analytics]', action, label ?? '', value ?? '');
  }
} 