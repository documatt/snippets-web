import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Tooltip from 'primevue/tooltip';

// All styles (includes Bulma and Prime)
import "@/assets/main.scss";

// Bulma JS for navbar burger and restyling PrimeVue with Bulma
import "@/bulma/navbar-burger-toggle.js";
// import { BulmaPT } from "@/bulma/BulmaPT";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, {
  // unstyled: true,
  // pt: BulmaPT
});
app.use(ToastService);

app.directive("tooltip", Tooltip)

app.mount("#app");
