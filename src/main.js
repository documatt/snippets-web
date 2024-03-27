import Vue from 'vue'
import App from './App.vue'
import { initGlobalState, store } from './store'
import Buefy from 'buefy'
import * as Sentry from '@sentry/vue'
import { sayVer, setLogLevelFromQR } from './utils'

setLogLevelFromQR()
sayVer()

Sentry.init({
  Vue,
  dsn:'https://9b2af326a0bf40539512abad9615e9e1@o4505595116650496.ingest.sentry.io/4505601347026944',
  integrations: [
    // new Sentry.Replay(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.1,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // replaysSessionSampleRate: 0.1,
  // replaysOnErrorSampleRate: 1.0,

  // To distinguish among environments in Sentry (dev, prod, ...)
  environment: process.env.VUE_APP_RUNNING_ENV
});

Vue.config.productionTip = false

Vue.use(Buefy)

// await can't be used outside async function, this is ugly workaround
// https://stackoverflow.com/a/44791115/915931
;(async () => {
  // Load Vuex state *before* the application ever has a chance to load
  await initGlobalState()

  // Regular Vue startup
  new Vue({
    store,
    render: h => h(App),
    provide: () => ({
      eventBus: new Vue()
    })
  }).$mount('#app')
})()
