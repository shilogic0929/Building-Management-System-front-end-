<template>
  <div class="echarts-map-container">
    <div ref="echartsMap" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      myChart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // 初始化 ECharts 实例
      this.myChart = echarts.init(this.$refs.echartsMap)

      // 在这里复制你原始代码中的图表配置
      var data = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
      ];

      // 转换数据格式
      var seriesData = [];
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          var item = [j, i, data[i][j]];
          seriesData.push(item);
        }
      }

      // 图表配置
      var option = {
        series: [{
          type: 'heatmap',
          data: seriesData,
          label: {
            show: true,
            formatter: function (params) {
              return params.value[2] === 1 ? '已占用' : '空闲';
            }
          },
          /* itemStyle: {
            color: function (params) {
              return params.value[2] === 1 ? 'red' : 'green';
            }
          } *///heatmap must use with visualMap
        }],
        visualMap: {
          min: 0,
          max: 1,
          calculable: false,
          show: false,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          inRange: {
            color: ['rgba(255,0,0,0.7)', 'rgba(30,144,255,0.7)'],
          },

        },
        tooltip: {
          formatter: function (params) {
            return params.value[2] === 1 ? '已占用' : '空闲';
          }
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        },
        yAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E']
        },

      };
      this.myChart.setOption(option)
    }
  }
}
</script>

<style></style>