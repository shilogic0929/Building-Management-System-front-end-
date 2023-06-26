<template>
  <div class="main-area">
    <div class="conclude">
      <div class="cludeTitle">
        <span class="Lline">|</span><span>&nbsp;管理概况</span>
      </div>

      <div style="margin-top: 20px" class="flexItem">
        <span class="cludeItem" style="background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);">
          <div>总访客数</div>
          <div>{{ visitors }}</div>
        </span>
        <span class="cludeItem" style="background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);">
          <div>总维修工单数</div>
          <div>{{ repairs }}</div>
        </span>
        <span class="cludeItem" style="background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);">
          <div>今日访客数</div>
          <div>{{ today_visit }}</div>
        </span>
        <span class="cludeItem"
          style="background-image: linear-gradient(to top, #ebbba7 0%, #cfc7f8 100%);margin-right: 0;">
          <div>今日工单数</div>
          <div>{{ today_repair }}</div>
        </span>
      </div>
    </div>

    <div style="height: 400px; margin-top: 20px; text-align: start;" class="flexItem">
      <span class="analyse">
        <div class="cludeTitle">
          <span class="Lline">|</span><span>&nbsp;近两周访客总量</span>
        </div>
        <div ref="mybar" class="bar_charts"></div>
      </span>
      <span class="analyse" style="margin-left: 20px;">
        <div class="cludeTitle">
          <span class="Lline">|</span><span>&nbsp;工单数量统计</span>
        </div>
        <div ref="myline" class="line_charts"></div>
      </span>
    </div>


    <div style="height: 300px; margin-top: 20px; text-align: start;" class="flexItem">
      <span class="analyse2">
        <div class="cludeTitle">
          <span class="Lline">|</span><span>&nbsp;维修类型分析</span>
        </div>
        <div>
          <!-- TODO 维修类型 -->
        </div>
      </span>
      <span class="analyse3">
        <div class="cludeTitle">
          <span class="Lline">|</span><span>&nbsp;访客公司统计</span>
        </div>
        <div>
          <!-- TODO 访客公司统计 -->
        </div>
      </span>
      <span class="analyse4" style="margin-left: 20px;">
        <div class="cludeTitle">
          <span class="Lline">|</span><span>&nbsp;今日待派发工单</span>
        </div>
        <div>
          <!-- TODO 今日待派发工单 -->
        </div>
      </span>
    </div>
  </div>
</template>


<script>
import * as echarts from "echarts"
import { ref, onMounted } from "vue";

export default {
  data() {
    return {
      visitors: 22356,
      repairs: 446,
      today_visit: 287,
      today_repair: 45,
      works_year: [
        {
          year: '2019',
          number_water: 150,
          number_elec: 220,
          number_mecha: 149,
          number_other: 123,
          number_total: 643
        },
        {
          year: '2020',
          number_water: 21,
          number_elec: 34,
          number_mecha: 22,
          number_other: 12,
          number_total: 89
        },
        {
          year: '2021',
          number_water: 23,
          number_elec: 45,
          number_mecha: 54,
          number_other: 21,
          number_total: 143
        },
        {
          year: '2022',
          number_water: 66,
          number_elec: 70,
          number_mecha: 56,
          number_other: 33,
          number_total: 219
        },
        {
          year: '2023',
          number_water: 100,
          number_elec: 113,
          number_mecha: 124,
          number_other: 200,
          number_total: 537
        },
      ],
      visitors_day: [
        {
          day: '2020-05-21',
          number: 10
        },
        {
          day: '2020-05-22',
          number: 3
        },
        {
          day: '2020-05-23',
          number: 5
        },
        {
          day: '2020-05-24',
          number: 7
        },
        {
          day: '2020-05-25',
          number: 5
        },
        {
          day: '2020-05-26',
          number: 8
        },
        {
          day: '2020-05-27',
          number: 3
        },
        {
          day: '2020-05-28',
          number: 2
        },
        {
          day: '2020-05-29',
          number: 5
        },
        {
          day: '2020-05-30',
          number: 6
        },
        {
          day: '2020-05-31',
          number: 3
        },
        {
          day: '2020-06-01',
          number: 6
        },
        {
          day: '2020-06-02',
          number: 1
        },
        {
          day: '2020-06-03',
          number: 8
        },
      ],
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getManageData();
      this.drawChart1();
      this.drawChart2();
    },
    getManageData() {
      var that = this
      const formData = new FormData();
      formData.append('token', localStorage.getItem('token'))
      this.$axios({
        method: 'POST',
        url: '/getStatistics',
        data: formData
      })
        .then(function (request) {
          var t = request.data.data
          that.visitors = t.total_visitors
          that.today_visit = t.today_visitors
          that.repairs = t.total_repair_forms
          that.today_repair = t.today_repair_forms
        })
    },
    drawChart1() {
      this.$axios({
        method: 'GET',
        url: '/getVisitorNumber'
      }).then(res => {
        this.visitors_day = res.data.data.company[0].visitors_day
        let myBar = echarts.init(this.$refs.mybar)
        myBar.setOption({
          color: [
            '#4E62AB',
            '#469EB4',
            '#87CFA4',
            '#CBE99D',
            '#F5FBB1',
            '#FEE89A',
            '#FDB96A',
            '#F57547',
            '#D6404E',
            '#9E0142'
          ],
          tooltip: {
            trigger: 'item'
          },
          // legend:{
          //   top: 10,
          // },
          dataset: {
            dimensions: ['day', 'number'],
            source: this.visitors_day
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '访客',
              type: 'bar',
              encode: { x: 0, y: 1 },
              itemStyle: {
                normal: {
                  color: function () {
                    return '#4E62AB'
                  }
                }
              }
            }
          ]
        })
      })
    },
    drawChart2() {
      this.$axios({
        method: 'get',
        url: '/getWorkNumber'
      }).then(res => {
        this.works_year = res.data.data.works_year
        let myLine = echarts.init(this.$refs.myline)
        myLine.setOption({
          title: {
            x: 'center'
          },
          legend: {
            top: 20
          },
          color: [
            '#4E62AB',
            '#469EB4',
            '#87CFA4',
            // '#CBE99D',
            // '#F5FBB1',
            '#FEE89A',
            '#FDB96A',
            '#F57547',
            '#D6404E',
            '#9E0142'
          ],
          tooltip: {
            // trigger: 'axis'
            trigger: 'axis',
            // axisPointer: 'shadow'
          },
          dataset: {
            dimensions: ['year', 'number_water', 'number_elec', 'number_mecha', 'number_other', 'number_total'],
            source: this.works_year
          },
          xAxis: {//x轴
            type: 'category'
            // data:
          },
          yAxis: {//y轴
            type: 'value'
          },
          series: [
            {
              name: '总和',
              type: 'line',
              encode: { x: 0, y: 5 },
              itemStyle: {
                normal: {
                  color: function () {
                    return '#4E62AB'
                  }
                }
              }
            },
            {
              name: '水工',
              type: 'line',
              encode: { x: 0, y: 1 },
              // data: this.colors
              itemStyle: {
                normal: {
                  color: function () {
                    return '#469EB4'
                  }
                }
              }
            },
            {
              name: '电气',
              type: 'line',
              encode: { x: 0, y: 2 },
              itemStyle: {
                normal: {
                  color: function () {
                    return '#87CFA4'
                  }
                }
              }
            },
            {
              name: '机械',
              type: 'line',
              encode: { x: 0, y: 3 },
              itemStyle: {
                normal: {
                  color: function () {
                    return '#CBE99D'
                  }
                }
              }
            },
            {
              name: '其他',
              type: 'line',
              encode: { x: 0, y: 4 },
              itemStyle: {
                normal: {
                  color: function () {
                    return '#F5FBB1'
                  }
                }
              }
            }
          ]
        })
      })
    }
  },
  setup() {
    // 时间
    const hour = ref(0);
    const minute = ref(0);
    const second = ref(0);
    onMounted(() => {
      setInterval(() => {
        let date = new Date();
        hour.value = date.getHours();
        minute.value = date.getMinutes();
        second.value = date.getSeconds();
      }, 1000);
    });
    return {
      hour,
      minute,
      second,
    };
  }
};
</script>

<style scoped>
.conclude {
  background-color: white;
  height: 200px;
  border-radius: 4px;
  box-shadow: 0 0 2px 2px #efefef;
  text-align: start;
  padding: 15px 15px;
}

.cludeTitle {
  font-size: 15px;
  font-weight: bold;
}

.Lline {
  color: rgb(64, 64, 254);
}

.cludeItem {
  margin-right: 30px;
  display: inline-block;
  width: 260px;
  height: 120px;
  border-radius: 8px;
  text-align: center;
  padding: 35px 40px;
  font-size: 18px;
  color: white;
}

.cludeItem div:nth-child(2) {
  margin-top: 16px;
  font-weight: bold;
}

.analyse {
  display: inline-block;
  width: 50%;
  height: 400px;
  background-color: white;
  box-shadow: 0 0 2px 2px #efefef;
  border-radius: 4px;
  padding: 15px 15px;
}

.analyse2 {
  display: inline-block;
  width: 25%;
  height: 300px;
  background-color: white;
  box-shadow: 0 0 2px 2px #efefef;
  border-radius: 4px;
  padding: 15px 15px;
  /* margin-right: 10px; */
}

.analyse3 {
  display: inline-block;
  width: 25%;
  height: 300px;
  background-color: white;
  box-shadow: 0 0 2px 2px #efefef;
  border-radius: 4px;
  padding: 15px 15px;
  /* margin-left: 10px; */
}

.analyse4 {
  display: inline-block;
  width: 50%;
  height: 300px;
  background-color: white;
  box-shadow: 0 0 2px 2px #efefef;
  border-radius: 4px;
  padding: 15px 15px;
}

.line_charts {
  top: 20px;
  width: 100%;
  height: 360px;
}

.bar_charts {
  width: 100%;
  height: 360px;
}

a {
  text-decoration: none;
}

ul {
  /* 去除默认样式 */
  padding: 0;
  /*去除项目符号 (小点)*/
  list-style: none;
}

.main-area {
  background-color: rgb(247, 247, 247);
  min-height: 44vw;
  padding: 25px 25px;
}
</style>