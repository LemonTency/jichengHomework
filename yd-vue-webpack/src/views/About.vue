<template>
  <div class="about">
    <!-- <h1>人员列表</h1> -->
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入姓名"
      v-model="value"
      :data="data"
    ></el-transfer>
  </div>
</template>
<script>
export default {
  data() {
    const generateData = _ => {
      // let names = [];
      const data = [];
      for (let i = 1; i <= 15; i++) {
        // names.push(`备选项 ${i}`);
        data.push({
          key: i,
          label: `备选项 ${i}`
        });
      }
      return data;
    };
    return {
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      }
    };
  },
  created() {
    const me = this;
    this.$axios
      .get("/api/userlist")
      .then(function(response) {
        let data = [];
        const result = response.data.result;
        for (let i = 0; i < result.length; i++) {
          //  console.log(result[i]);
          data.push({
            key: i,
            label: result[i].name
          });
        }
        me.data = data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }
};
</script>
<style lang="postcss">
:root {
  --bgColor: white;
}
.about {
  background: var(--bgColor);
  display: flex;
  justify-content: center;
  & h1 {
    --h1Color: yellowgreen;
    color: var(--h1Color);
  }
}
</style>

