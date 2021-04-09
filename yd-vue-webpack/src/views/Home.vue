<template>
  <div class="home">
    <div id="nav" class="nav">
      <router-link to="/zgjs">首页</router-link>|
      <router-link to="/zgjs/about">关于我们</router-link>
      <router-link to="/zgjs/orderlist">订单展示</router-link>
    </div>
    <!-- <router-view /> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home"
};
</script>
<style lang="postcss">
.home {
}
</style>

