import Vue from "vue";
import Router from "vue-router";
//同步组件 打包进entry的主入口文件
import Home from "@/views/Home.vue";
// import "vue-userlist/src/BuyList.css"
// import vueComponents from "vue-userlist";
import Login from "@/components/Login.vue";
//如果一个组件够你用了 路由对接这个组件
//如果一个组件不够你用 views文件夹新建一个组件 引用components里的组件进行合并
// import OrderList from './components/OrderList.vue'
//异步组件 生成独立的jS 同步组件 app.js 包越老越大

//对于vue所有的插件 我们可以去使用Vue.use的方式进行应用
Vue.use(Router);
Vue.use(vueComponents);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/common",
      name: "common",
      component: {
        template: '<buy-list></buy-list>'
      }
      //component: () =>import(/* webpackChunkName: "userlist" */ "vue-userlist/src/BuyList.vue")
    },
    {
      path: "/zgjs",
      component: Home,
      children: [
        {
          path: "/",
          name: "welcome",
          meta: {
            keepAlive: true,
            needLogin: true
          },
          component: () =>
            import(/* webpackChunkName: "welcome" */ "./components/Welcome.vue")
        },
        {
          path: "orderlist",
          name: "orderlist",
          meta: {
            needLogin: true
          },
          component: () =>
            import(
              /* webpackChunkName: "orderlist" */ "./components/OrderList.vue"
            )
        },
        {
          path: "orderdetail",
          name: "orderdetail",
          meta: {
            needLogin: true
          },
          component: () =>
            import(
              /* webpackChunkName: "detail" */ "./components/OrderDetail.vue"
            )
        },
        {
          path: "about",
          name: "about",
          meta: {
            needLogin: true
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/About.vue")
        }
      ]
    }
  ]
});
//对路由进行守护
router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage["userMsg"];
  //判断该路由是否需要登录权限
  if (to.meta.needLogin) {
    if (isLogin) {
      //判断是否已经登录
      next();
    } else {
      next({
        path: "/",
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: { redirect: to.fullPath } 
      });
    }
  } else {
    next();
  }
});
export default router;
