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
      myChart: null,
      Level: '1',
      roomStatus: [
        {
          "roomNo": 101,
          "isRented": true,
          "userID": 1,
          "userName": "faker",
          "startTime": "2023.06.19",
          "endTime": "2055.02.25",
          "Company": "buaa"
        },
        {
          "roomNo": 102,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 103,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 104,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 105,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 106,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 107,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 108,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 109,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 110,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 111,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 112,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 113,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 114,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 115,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 116,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 117,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 118,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 119,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 120,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 121,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 122,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 123,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 124,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 125,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 126,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 127,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 128,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 129,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 130,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 131,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 132,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 133,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 134,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 135,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 136,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 137,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 138,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 139,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 140,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 141,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 142,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 143,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 144,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 145,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 146,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 147,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 148,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 149,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        },
        {
          "roomNo": 150,
          "isRented": false,
          "userID": null,
          "userName": null,
          "startTime": null,
          "endTime": null,
          "Company": null
        }
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      //axios以get方式请求数据
      // var formdata = {
      //   level: this.Level,
      // }
      // this.$axios.post('https://10.251.252.218/test/getRoomStatus', formdata)
      //   .then(function (response) {
      //     console.log(response.data.data);
      //   })
      const roomNoArray2 = [];
      this.roomStatus.forEach(element => {
        roomNoArray2.push(new Array(element.roomNo, element.isRented, element.userName, element.startTime, element.endTime, element.Company))
      });
      console.log(roomNoArray2);

      const roomNoArray = [];
      const roomIsRented = [];
      for (let i = 0; i < 5; i++) {
        const row_noArray = [];
        const row_IsRented = [];
        for (let j = 0; j < 10; j++) {
          const thisRoom = [];
          thisRoom.push(this.roomStatus[i * 10 + j].roomNo, this.roomStatus[i * 10 + j].isRented, this.roomStatus[i * 10 + j].userName, this.roomStatus[i * 10 + j].startTime, this.roomStatus[i * 10 + j].endTime, this.roomStatus[i * 10 + j].Company);
          row_noArray.push(thisRoom)
          row_IsRented.push(this.roomStatus[i * 10 + j].isRented ? 1 : 0)
        }
        roomNoArray.push(row_noArray);
        roomIsRented.push(row_IsRented);
      }
      console.log(roomNoArray);
      console.log(roomIsRented);
      // 初始化 ECharts 实例
      this.myChart = echarts.init(this.$refs.echartsMap)

      // 转换数据格式
      var seriesData = [];
      for (var i = 0; i < roomIsRented.length; i++) {
        for (var j = 0; j < roomIsRented[i].length; j++) {
          var item = [j, i, roomNoArray[i][j][0], roomNoArray[i][j][1] ? 1 : 0, roomNoArray[i][j][2], roomNoArray[i][j][3], roomNoArray[i][j][4], roomNoArray[i][j][5]];
          seriesData.push(item);
        }
      }
      console.log(seriesData);
      // 图表配置
      var option = {
        series: [{
          type: 'heatmap',
          data: seriesData,
          label: {
            show: true,
            color: 'black',
            fontSize: 15,
            formatter: function (params) {
              return params.value[3] === 1 ? '已占用' : '空闲';
            }
          }
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
          // show: false,
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          splitLine: {
            show: true,
            lineStyle: {
              width: 2,
              color: 'black',
              join: 'round'
            }
          },
          axisLabel: { show: false }
        },
        yAxis: {
          // show: false,
          type: 'category',
          inverse: true,
          data: ['A', 'B', 'C', 'D', 'E'],
          splitLine: {
            show: true,
            lineStyle: {
              width: 2,
              color: 'black',
              join: 'round'
            }
          },
          axisLabel: { show: false }
        },

      };
      this.myChart.setOption(option)
    }
  }
}
</script>

<style></style>