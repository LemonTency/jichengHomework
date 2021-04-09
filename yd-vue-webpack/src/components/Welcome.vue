<template>
  <div class="welcome">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="欢迎进入中台系统" />
  </div>
</template>

<script>
const data = "测试数据";
class Test{
  constructor(props) {
    console.log("类数据",data);
  }
}
console.log(new Test);
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "welcome",
  components: {
    HelloWorld
  }
};
</script>
<style lang="postcss">
.welcome {
  text-align: center;
}
</style>

