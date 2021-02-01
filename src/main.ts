import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { localize } from "vee-validate";
import ru from "vee-validate/dist/locale/ru.json";

Vue.config.productionTip = false;

extend("required", { ...required, message: "Поле не должно быть пустым" });

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

localize({
  ru
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
