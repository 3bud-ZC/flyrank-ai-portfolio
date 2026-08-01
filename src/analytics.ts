declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const measurementId =
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || 'G-L9R1SMW4DF'

export function initializeAnalytics() {
  if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return

  window.dataLayer = window.dataLayer || []

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args)
    }
  }

  const existingScript = document.querySelector(
    `script[src*="gtag/js?id=${measurementId}"]`,
  )

  if (existingScript) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  script.dataset.ga4Id = measurementId
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true,
  })
}

export function trackPageView(route: string) {
  if (!window.gtag) return

  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `/${route || ''}`,
  })
}
