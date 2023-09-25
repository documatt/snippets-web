/**
 * All conf loading and logic here
 */

export default {
  SENTRY_ENV: import.meta.env.VITE_SENTRY_ENV,
  SENTRY_ENABLED: import.meta.env.VITE_SENTRY_ENABLED === 'false' ? false : true,
}