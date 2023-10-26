/**
 * Setup code reused for Vue and Cypress component testing
 **/

import './assets/css/main.scss'

import api from '@/plugins/api'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import { createApp } from 'vue'
import * as Sentry from "@sentry/vue";
import { createHead } from '@unhead/vue'

import App from './App.vue'
import { logger } from './utils/logger'
import conf from './utils/conf'
import { router } from './router'

const app = createApp(App)

logger.debug("Snippets-web starting. Envs:", JSON.stringify(conf))

// *****************************************************************************
// Error reporting
// *****************************************************************************

Sentry.init({
  app,
  dsn: "https://9b2af326a0bf40539512abad9615e9e1@o4505595116650496.ingest.sentry.io/4505601347026944",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],
  environment: conf.SENTRY_ENV,
  enabled: conf.SENTRY_ENABLED,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});


// *****************************************************************************
// Official stuff
// *****************************************************************************

app.use(createPinia())
app.use(router)

// Unhead for managing <head>, <script>, etc.
const head = createHead()
app.use(head)

// *****************************************************************************
// Prime stuff
// *****************************************************************************

app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(ConfirmationService)

// Often used components that don't need import
// app.component("Button", Button);
// ...

app.directive('styleclass', StyleClass)
app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)

// *****************************************************************************
// Our
// *****************************************************************************

// Inject API
app.use(api)

export default app