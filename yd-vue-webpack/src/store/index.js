import Vue from "vue";
import Vuex from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSuccess: false
  },
  actions,
  mutations
});
// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// export default new Vuex.Store({
//   state: {

//   },
//   mutations: {

//   },
//   actions: {

//   }
// })
