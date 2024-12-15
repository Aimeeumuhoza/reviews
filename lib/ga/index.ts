import { GOOGLE_ANALYTICS_TRACKING_ID } from '../../config/constants'

declare global {
  interface Window {
    gtag: (
      config: string,
      gtm: string,
      props: Record<string, string>,
    ) => Record<string, string> | string
  }
}

// log the pageview with their URL
export const pageview = (url: string): void => {
  window.gtag('config', GOOGLE_ANALYTICS_TRACKING_ID, {
    page_path: url,
  })
}

// log specific events happening.
export const event = ({
  action,
  params,
}: {
  action: string
  params: Record<string, string>
}): void => {
  window.gtag('event', action, params)
}
