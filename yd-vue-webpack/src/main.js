import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui';
import store from './store';
import VueHighcharts from 'vue-highcharts';
// Vue.use(ElementUI);
Vue.use(VueHighcharts);
Vue.config.productionTip = false;
import axios from 'axios';
Vue.prototype.$axios = axios;
//注册所有的filters
import * as filters from './filters' 
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.component('button-counter',{
  data: function () {
   return {
     count: 0
   }
 },
 template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
