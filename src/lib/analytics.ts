export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Track page views (called in layout)
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, { page_path: url })
  }
}

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}

// Extend Window type
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}
