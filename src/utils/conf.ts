/**
 * All conf loading and logic here. To override with env var, its name must be
 * `VITE_` prefixed.
 */
import NProgress from 'nprogress'

export default {
  SENTRY_ENV: import.meta.env.VITE_SENTRY_ENV,
  SENTRY_ENABLED: import.meta.env.VITE_SENTRY_ENABLED === 'false' ? false : true,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  STATCOUNTER_PROJECT: import.meta.env.VITE_STATCOUNTER_PROJECT,
  STATCOUNTER_SECURITY: import.meta.env.VITE_STATCOUNTER_SECURITY,
}

// Only bar on the top, not spinner on the right upper corner
NProgress.configure({showSpinner: false})