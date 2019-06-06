import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vuetify from "vuetify";

import "bulma/css/bulma.css";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.use(Vuetify, {
  options: {
    customProperties: true,
    iconfont: "fa"
  }
});

Vue.directive("scroll", {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  }
});

new Vue({
  router,
  store,
  beforeCreate: function() {
    this.$store.dispatch("fetchResumeByEmail");
    this.$store.dispatch("initializeStore");
  },
  render: h => h(App)
}).$mount("#app");
