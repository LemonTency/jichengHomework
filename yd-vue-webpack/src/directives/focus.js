// Vue.directive('focus', {
//   inserted: function (el) {
//     //dom原生的操作
//     // el.focus();
//     el.value = "请输入账号密码";
//     console.log(el);
//   }
// })

const focusDirectives = {
  inserted: function (el) {
    //dom原生的操作
    // el.focus();
    el.value = "我是自定义的Directives";
    console.log(el);
  }
}
export default focusDirectives;