<template>
  <el-card>
    <template #header>
      <div class = "card-header" style="margin-bottom:0px;">
        <span class="image-font" style="font-size:20px; margin: 0 auto">维修统计信息</span>
      </div>
      <div style="text-align: left">
        <div style="width: 200px;text-align: center">
          <el-switch
              v-model="switch_value"
              class="mb-2"
              active-text="展示年份"
              inactive-text="展示月份"
          />
        </div>
      </div>
      <div ref="mybar" class="bar_charts"></div>
<!--      <hr>-->
      <div ref="myline" class="line_charts"></div>
<!--      <div class="collect_data">-->

<!--      </div>-->
    </template>

  </el-card>
</template>

<script>
import * as echarts from "echarts"
export default {
  name: "collectClients",
  data(){
    return{
      works_year:[
        {
          year:'2019',
          number_water: 150,
          number_elec: 220,
          number_mecha: 149,
          number_other: 123,
          number_total: 643
        },
        {
          year:'2020',
          number_water: 21,
          number_elec: 34,
          number_mecha: 22,
          number_other: 12,
          number_total: 89
        },
        {
          year:'2021',
          number_water: 23,
          number_elec: 45,
          number_mecha: 54,
          number_other: 21,
          number_total: 143
        },
        {
          year:'2022',
          number_water: 66,
          number_elec: 70,
          number_mecha: 56,
          number_other: 33,
          number_total: 219
        },
        {
          year:'2023',
          number_water: 100,
          number_elec: 113,
          number_mecha: 124,
          number_other: 200,
          number_total: 537
        },
      ],
      works_month:[
        {
          month:'2023-02',
          number_water: 12,
          number_elec: 3,
          number_mecha: 4,
          number_other: 5,
          number_total: 25
        },
        {
          month:'2023-03',
          number_water: 7,
          number_elec: 12,
          number_mecha: 3,
          number_other: 6,
          number_total: 28
        },
        {
          month:'2023-04',
          number_water: 3,
          number_elec: 6,
          number_mecha: 4,
          number_other: 7,
          number_total: 20
        },
        {
          month:'2023-05',
          number_water: 23,
          number_elec: 12,
          number_mecha: 5,
          number_other: 8,
          number_total: 48
        },
        {
          month:'2023-06',
          number_water: 34,
          number_elec: 35,
          number_mecha: 76,
          number_other: 32,
          number_total: 177
        }
      ],
      switch_value: true
    }
  },
  mounted() {
    this.getWorksInfo()
  },
  methods:{
    getWorksInfo(){
      this.$axios({
        method:'get',
        url:'/getWorkNumber'
      }).then(res => {
        console.log(res.data)
        this.works_month = res.data.data.works_month
        this.works_year = res.data.data.works_year
        console.log(this.works_month)
        console.log(this.works_year)
        let myBar = echarts.init(this.$refs.mybar)
        //设置柱状图参数
        myBar.setOption({
          color:[
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
          tooltip:{
            // trigger: 'axis'
            trigger: 'item',
            // axisPointer: 'shadow'
          },
          legend:{
            top: 10,
          },
          dataset:{
            dimensions: ['year','number_water','number_elec','number_mecha','number_other','number_total'],
            source: this.works_year
          },
          xAxis:{//x轴
            type: 'category'
          },
          yAxis:{//y轴
            type: 'value'
          },
          series:[
            {
              name:'水工',
              type:'bar',
              encode: {x:0, y:1},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            },
            {
              name:'电气',
              type:'bar',
              encode: {x:0, y:2},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#469EB4'
                  }
                }
              }
            },
            {
              name:'机械',
              type:'bar',
              encode: {x:0, y:3},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#87CFA4'
                  }
                }
              }
            },
            {
              name:'其他',
              type:'bar',
              encode: {x:0, y:4},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#CBE99D'
                  }
                }
              }
            }
          ]
        })
        //折线图
        let myLine = echarts.init(this.$refs.myline)
        myLine.setOption({
          title:{
            text: '维修信息折线图',
            x:'center'
          },
          legend:{
            top:20
          },
          color:[
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
          tooltip:{
            // trigger: 'axis'
            trigger: 'axis',
            // axisPointer: 'shadow'
          },
          dataset:{
            dimensions: ['year','number_water','number_elec','number_mecha','number_other','number_total'],
            source: this.works_year
          },
          xAxis:{//x轴
            type: 'category'
            // data:
          },
          yAxis:{//y轴
            type: 'value'
          },
          series:[
            {
              name: '总和',
              type: 'line',
              encode: {x:0, y:5},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            },
            {
              name:'水工',
              type:'line',
              encode: {x:0, y:1},
              // data: this.colors
              itemStyle:{
                normal:{
                  color: function (){
                    return '#469EB4'
                  }
                }
              }
            },
            {
              name:'电气',
              type:'line',
              encode: {x:0, y:2},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#87CFA4'
                  }
                }
              }
            },
            {
              name:'机械',
              type:'line',
              encode: {x:0, y:3},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#CBE99D'
                  }
                }
              }
            },
            {
              name:'其他',
              type:'line',
              encode: {x:0, y:4},
              itemStyle:{
                normal:{
                  color: function (){
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
  created(){
  },
  watch:{
    switch_value(newValue){
      if(newValue === true){
        let myBar = echarts.init(this.$refs.mybar)
        myBar.setOption({
          color:[
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
          tooltip:{
            // trigger: 'axis'
            trigger: 'item',
            // axisPointer: 'shadow'
          },
          title:{//柱状图标题
            // text:"hello world"
          },
          legend:{
            top: 10,
          },
          dataset:{
            dimensions: ['year','number_water','number_elec','number_mecha','number_other','number_total'],
            source: this.works_year
          },
          xAxis:{//x轴
            type: 'category'
            // data:
          },
          yAxis:{//y轴
            // data: this.y
            type: 'value'
          },
          series:[
            {
              name:'水工',
              type:'bar',
              encode: {x:0, y:1},
              // data: this.colors
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            },
            {
              name:'电气',
              type:'bar',
              encode: {x:0, y:2},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#469EB4'
                  }
                }
              }
            },
            {
              name:'机械',
              type:'bar',
              encode: {x:0, y:3},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#87CFA4'
                  }
                }
              }
            },
            {
              name:'其他',
              type:'bar',
              encode: {x:0, y:4},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#CBE99D'
                  }
                }
              }
            }
          ]
        })
        let myLine = echarts.init(this.$refs.myline)
        myLine.setOption({
          title:{
            text: '维修信息折线图',
            x:'center'
          },
          legend:{
            top:20
          },
          color:[
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
          tooltip:{
            // trigger: 'axis'
            trigger: 'axis',
            // axisPointer: 'shadow'
          },
          dataset:{
            dimensions: ['year','number_water','number_elec','number_mecha','number_other','number_total'],
            source: this.works_year
          },
          xAxis:{//x轴
            type: 'category'
            // data:
          },
          yAxis:{//y轴
            type: 'value'
          },
          series:[
            {
              name: '总和',
              type: 'line',
              encode: {x:0, y:5},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            },
            {
              name:'水工',
              type:'line',
              encode: {x:0, y:1},
              // data: this.colors
              itemStyle:{
                normal:{
                  color: function (){
                    return '#469EB4'
                  }
                }
              }
            },
            {
              name:'电气',
              type:'line',
              encode: {x:0, y:2},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#87CFA4'
                  }
                }
              }
            },
            {
              name:'机械',
              type:'line',
              encode: {x:0, y:3},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#CBE99D'
                  }
                }
              }
            },
            {
              name:'其他',
              type:'line',
              encode: {x:0, y:4},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#F5FBB1'
                  }
                }
              }
            }
          ]
        })
      }
      else{
        let myBar = echarts.init(this.$refs.mybar)
        myBar.setOption({
          color:[
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
          tooltip:{
            // trigger: 'axis'
            trigger: 'item',
            // axisPointer: 'shadow'
          },
          title:{//柱状图标题
            // text:"hello world"
          },
          legend:{
            top: 10,
          },
          dataset:{
            dimensions: ['month','number_water','number_elec','number_mecha','number_other','number_total'],
            source: this.works_month
          },
          xAxis:{//x轴
            type: 'category'
            // data:
          },
          yAxis:{//y轴
            // data: this.y
            type: 'value'
          },
          series:[
            {
              name:'水工',
              type:'bar',
              encode: {x:0, y:1},
              // data: this.colors
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            },
            {
              name:'电气',
              type:'bar',
              encode: {x:0, y:2},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#469EB4'
                  }
                }
              }
            },
            {
              name:'机械',
              type:'bar',
              encode: {x:0, y:3},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#87CFA4'
                  }
                }
              }
            },
            {
              name:'其他',
              type:'bar',
              encode: {x:0, y:4},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#CBE99D'
                  }
                }
              }
            }
          ]
        })
        let myLine = echarts.init(this.$refs.myline)
        myLine.setOption({
          title:{
            text: '维修信息折线图',
            x:'center'
          },
          legend:{
            top:20
          },
          color:[
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
          tooltip:{
            // trigger: 'axis'
            trigger: 'axis',
            // axisPointer: 'shadow'
          },
          dataset:{
            dimensions: ['month','number_water','number_elec','number_mecha','number_other','number_total'],
            source: this.works_month
          },
          xAxis:{//x轴
            type: 'category'
            // data:
          },
          yAxis:{//y轴
            type: 'value'
          },
          series:[
            {
              name: '总和',
              type: 'line',
              encode: {x:0, y:5},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            },
            {
              name:'水工',
              type:'line',
              encode: {x:0, y:1},
              // data: this.colors
              itemStyle:{
                normal:{
                  color: function (){
                    return '#469EB4'
                  }
                }
              }
            },
            {
              name:'电气',
              type:'line',
              encode: {x:0, y:2},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#87CFA4'
                  }
                }
              }
            },
            {
              name:'机械',
              type:'line',
              encode: {x:0, y:3},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#CBE99D'
                  }
                }
              }
            },
            {
              name:'其他',
              type:'line',
              encode: {x:0, y:4},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#F5FBB1'
                  }
                }
              }
            }
          ]
        })
      }
    },
  }
}
</script>

<style scoped>
.bar_charts{
  margin: 20px;
  width: 100%;
  height: 500px;
  /*border: 1px solid red;*/
}
.line_charts{
  top: 20px;
  width: 100%;
  height: 500px;
  margin: 20px;
  float: left;
}
.collect_data{
  margin: 20px 20px 30px 20px;
  top: 20px;
  height: 500px;
  width: 100%;
  /*test*/
  background-color: #2b4a85;
  float: right;
}
</style>