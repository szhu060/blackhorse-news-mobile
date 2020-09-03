import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant, { Lazyload } from "vant";
import "vant/lib/index.css";
import "amfe-flexible/index.js";
import "@/styles/common.less";
import { relativeTime } from "@/utils/date-time.js";
// console.log(relativeTime(Date.now()));//几秒前
// 要在项目中使用全局过滤器，这样就可以在所有组件内部来使用了。
// Vue.filter('过滤器名'，function(过滤前的值){return 过滤之后的值})
/** 给某段时间使用过滤器
 *  <template>
      {{val | 过滤器}}
    </template>
 */

Vue.filter("rTime", relativeTime);

Vue.config.productionTip = false;
Vue.use(Vant);

Vue.use(Lazyload);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
