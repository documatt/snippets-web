import Vue from 'vue'
import App from './App.vue'
import { initGlobalState, store } from './store'
import Buefy from 'buefy'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import { sayVer, setLogLevelFromQR } from './utils'

setLogLevelFromQR()
sayVer()

Sentry.init({
  dsn: 'https://84efc7bb43e747d1b8e8e2576c34da55@o480229.ingest.sentry.io/5526698',
  integrations: [new VueIntegration({ Vue, attachProps: true })],
})

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
