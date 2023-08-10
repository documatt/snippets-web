import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

// All styles
import "@/assets/main.scss";

// --- Bulma ----
// Bulma style overrides imported already by main.scss
import "@/bulma/navbar-burger-toggle.js";
// import { BulmaPT } from "./BulmaPT";

// --- PrimeVue ----
// likely to be removed ---->>>
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primeflex/primeflex.css";
import "primevue/resources/primevue.min.css";
// <<<----
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, {
  // unstyled: true,
  // pt: BulmaPT
});
app.use(ToastService);

app.mount("#app");
