<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>{{data | capitalize}}</h3>
    <p>这是一个使用Webpack+Vue自定义的开发环境。</p>
    <input v-focus />
    <highcharts :options="options"></highcharts>
  </div>
</template>

<script>
import focusDirectives from "@/directives/focus";
export default {
  name: "HelloWorld",
  data() {
    return {
      options: {
        title: {
          text: "2010 ~ 2016 年太阳能行业就业人员发展情况"
        },
        subtitle: {
          text: "数据来源：thesolarfoundation.com"
        },
        yAxis: {
          title: {
            text: "就业人数"
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [
          {
            name: "安装，实施人员",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          },
          {
            name: "工人",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          },
          {
            name: "销售",
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
          },
          {
            name: "项目开发",
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
          },
          {
            name: "其他",
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
          }
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      },
      data: "abcefg"
    };
  },
  filters: {
    // capitalize: function(value) {
    //   if (!value) return "";
    //   value = value.toString();
    //   return value.charAt(0).toUpperCase() + value.slice(1);
    // }
  },
  directives: {
    focus: focusDirectives
  },
  props: {
    msg: String
  }
};
</script>
<style  lang="postcss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>