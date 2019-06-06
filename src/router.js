import Vue from "vue";
import Router from "vue-router";
import ResumePage from "./views/ResumePage";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  name: "boosterRouter",
  routes: [
    {
      path: "/:email",
      name: "ResumePage",
      component: ResumePage
    }
  ]
});
