<template>
  <div class="echarts-map-container">
    <h1 style="text-align: left;margin-top:45px;margin-left: 45px;font-size: 30px;">房间状态</h1>


    <div style="text-align:left;margin-top:40px;margin-left:45px">
      <span style="font-size: 20px;margin-top: 5px;">请选择楼层：</span>
      <el-select v-model="selectedLevel" placeholder="请选择楼层" style="margin-top: -3px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>



    <div ref="echartsMap" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      selectedLevel: '1',
      myChart: null,
      Level: '2',
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
          "isRented": true,
          "userID": 1,
          "userName": "faker",
          "startTime": "2023.06.19",
          "endTime": "2055.02.25",
          "Company": "buaa"
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
      ],
      options: [],
    }
  },

  watch: {
    selectedLevel(newVal) {
      // 在这里执行相应的操作
      console.log('selectedLevel 的值已改变为:', newVal);
      this.initChart(newVal)
    },
  },

  mounted() {
    this.initChart('1')
  },
  created() {
    this.generateOptions(25);
  },
  methods: {
    generateOptions(maxValue) {
      for (let i = 1; i <= maxValue; i++) {
        this.options.push({
          value: i.toString(),
          label: i.toString() + '层',
        });
      }
      console.log(this.options);
    },

    initChart(thislev) {
      var level = thislev;

      const formData = new FormData()
      formData.append('level', level)
      this.$axios({
        method: 'POST',
        url: 'http://10.251.252.218/test/getRoomStatus',
        data: formData
      }).then(res => {
        console.log('res.data.data');
        console.log(res.data.data);
        this.roomStatus = res.data.data;
        console.log('this.roomStatus');
        console.log(this.roomStatus);
        const roomNoArray2 = [];
        this.roomStatus.forEach(element => {
          roomNoArray2.push(new Array(element.roomNo, element.isRented, element.userName, element.startTime, element.endTime, element.Company))
        });
        // console.log(roomNoArray2);

        const roomNoArray = [];
        for (let i = 0; i < 5; i++) {
          const row_noArray = [];
          for (let j = 0; j < 10; j++) {
            const thisRoom = [];
            thisRoom.push(this.roomStatus[i * 10 + j].roomNo, this.roomStatus[i * 10 + j].isRented, this.roomStatus[i * 10 + j].userName, this.roomStatus[i * 10 + j].startTime, this.roomStatus[i * 10 + j].endTime, this.roomStatus[i * 10 + j].Company);
            row_noArray.push(thisRoom)
          }
          roomNoArray.push(row_noArray);
        }
        // 初始化 ECharts 实例
        this.myChart = echarts.init(this.$refs.echartsMap)

        // 转换数据格式
        var seriesData = [];
        for (var i = 0; i < roomNoArray.length; i++) {
          for (var j = 0; j < roomNoArray[i].length; j++) {
            var item = [j, i, roomNoArray[i][j][1] ? 1 : 0];
            seriesData.push(item);
          }
        }
        // console.log(seriesData);
        //roomNoArray2  seriesData
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
                return (level < 10 ? ('0' + level.toString()) : level.toString())
                  + ((1 + params.value[0] + params.value[1] * 10) < 10 ?
                    ('0' + (1 + params.value[0] + params.value[1] * 10).toString()) : (1 + params.value[0] + params.value[1] * 10).toString())
                  + '\n\n'
                  + (params.value[2] === 1 ? '已占用' : '空闲');
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
              color: ['rgba(144,238,144,0.8)', 'rgba(255,140,0,0.5)',],
            },

          },
          tooltip: {
            formatter: function (params) {
              var i = 10 * params.value[1] + params.value[0];
              if (params.value[2] == 1)
                return '租赁人：' + roomNoArray2[i][2] + '<br/>租赁公司：' + roomNoArray2[i][5] + '<br/>租赁周期：' + roomNoArray2[i][3] + '~' + roomNoArray2[i][4];
              else return '空闲'
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
      })

    }
  }
}
</script>

<style></style>