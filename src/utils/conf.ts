/**
 * All conf loading and logic here
 */
import NProgress from 'nprogress'

export default {
  SENTRY_ENV: import.meta.env.VITE_SENTRY_ENV,
  SENTRY_ENABLED: import.meta.env.VITE_SENTRY_ENABLED === 'false' ? false : true,
}

// Only bar on the top, not spinner on the right upper corner
NProgress.configure({showSpinner: false})