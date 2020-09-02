import Vue from "vue";
import Vuex from "vuex";
// import localStorage methods
import { setItem, getItem } from "@/utils/localStorage.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* create a variable to depoist token */
    tokenInfo: getItem("tokenInfo") || {}
    // get token deposited in localStorage
  },
  mutations: {
    /* refresh depoist token */
    setTokenInfo(state, obj) {
      state.tokenInfo = obj;
      setItem("tokenInfo", obj);
    }
  },
  actions: {},
  modules: {}
});
