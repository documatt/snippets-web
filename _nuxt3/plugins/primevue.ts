import PrimeVue from "primevue/config";
import ScrollTop from "primevue/scrolltop";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import StyleClass from "primevue/styleclass";
import Ripple from "primevue/ripple";
import Tooltip from "primevue/tooltip";
import Divider from "primevue/divider";
import ConfirmationService from 'primevue/confirmationservice';

export default defineNuxtPlugin((nuxtApp) => {
  // Plugins
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);

  nuxtApp.vueApp.component("ScrollTop", ScrollTop);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("Divider", Divider);
  //other components that you need

  nuxtApp.vueApp.directive("styleclass", StyleClass);
  nuxtApp.vueApp.directive("ripple", Ripple);
  nuxtApp.vueApp.directive("tooltip", Tooltip);
});
