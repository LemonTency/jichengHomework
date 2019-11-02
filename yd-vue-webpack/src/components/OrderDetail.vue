<template>
  <div>
    获取到的用户参数{{uid}}
    <hr/>
    {{result}}
  </div>
</template>

<script>
  export default {
    name:"OrderDetail",
    created(){
      const uid = this.uid;
      const me = this;
      console.log("我已经获取到用户的参数",uid);
      this.$axios
        .get(`/api/getdata?uid=${uid}`)
        .then(function(response) {
          me.result = response.data.result.address;
        })
        .catch(function(error) {
          me.result = "😿请求失败";
        })
    },
    data() {
      return {
        uid: this.$route.query.uid,
        result:"loading......."
      }
    },
  }
</script>