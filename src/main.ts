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

import App from './App.vue'
import { router } from './router'

const app = createApp(App)

// *****************************************************************************
// Official stuff
// *****************************************************************************

app.use(createPinia())
app.use(router)

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

// *** Error handling **********************************************************

// Vue errors (template, watcher, ...)
// app.config.errorHandler = (err, instance, info) => {
//   alert(`${err}, ${instance}, ${info}`)
// }

// Runtime non-Promise errors
// window.onerror = (message, source, lineno, colno, error) => {
//   // alert(`${event} ${source} ${lineno} ${colno} ${error}`)
//   // console.log(`${event} ${source} ${lineno} ${colno} ${error}`)
//   location.href = "/error.html"
// }

// // Unhandled rejected promises
// window.onunhandledrejection = (event) => {
//   //event.promise contains the promise object
//   //event.reason contains the reason for the rejection
//   // alert(`Rejected promise ${event.promise} and reason ${event.reason}`)
//   // location.href = "/error.html"
// }

// *****************************************************************************
// Bang
// *****************************************************************************

app.mount('#app')
