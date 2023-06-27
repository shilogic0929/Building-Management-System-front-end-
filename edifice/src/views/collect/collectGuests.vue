<template>
  <el-card>
    <template #header>
      <div class = "card-header" style="margin-bottom:0px;">
        <div class="image-font" style="font-size:20px; margin: 0 auto">访客数量统计</div>
      </div>
      <div style="text-align: center">
        <div style="width: 200px;text-align: center">
          <el-switch
              v-model="switch_value"
              class="mb-2"
              active-text="展示月份"
              inactive-text="展示日期"
          />
        </div>
        <el-select v-model="choose_name" filterable :placeholder=this.company[this.choose_index].name style="">
          <el-option
              v-for="item in company"
              :key="item.name"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
      </div>

      <div ref="mybar" class="bar_charts"></div>
      <div ref="myline" class="line_charts"></div>
      <div ref="total_bar" class="total_bar"></div>
    </template>

  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "collectGuests",
  data(){
    return{
      company:[
        {
          name:'总和',
          visitors_day: [
            {
              day: '2020-05-21',
              number: 10
            },
            {
              day:'2020-05-22',
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
              day:'2020-05-29',
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
          visitors_month: [
            {
              month:'2020-02',
              number: 46
            },
            {
              month:'2020-03',
              number: 15
            },
            {
              month: '2020-04',
              number: 12
            },
            {
              month: '2020-05',
              number: 34
            },
            {
              month: '2020-06',
              number: 12
            },
            {
              month: '2020-07',
              number: 32
            },
            {
              month: '2020-08',
              number: 52
            },
            {
              month: '2020-09',
              number: 17
            },
            {
              month: '2020-10',
              number: 54
            },
            {
              month: '2020-11',
              number: 32
            },
            {
              month: '2020-12',
              number: 37
            },
            {
              month: '2021-01',
              number: 24
            },
          ],
        },

      ],
      company_total:[
        {
          name:'aaa',
          number: 10
        },
        {
          name:'bbb',
          number: 12
        },
        {
          name:'ccc',
          number: 15
        },
        {
          name:'ddd',
          number: 17
        },
        {
          name:'56',
          number: 10
        },
        {
          name:'42',
          number: 10
        },
        {
          name:'32',
          number: 10
        },
        {
          name:'da',
          number: 10
        },
        {
          name:'sa',
          number: 10
        },
        {
          name:'wq',
          number: 10
        },
      ],
      switch_value: true,
      choose_name: '',//选择框名字
      choose_index:0//选择框名字对应所在的数组下表
    }
  },
  mounted() {
    this.getGuestNumber()
  },
  watch:{
    switch_value(newValue){//判断显示日期或者月份
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
            trigger: 'item'
          },
          dataset:{
            dimensions:['month','number'],
            source: this.company[this.choose_index].visitors_month
          },
          xAxis:{
            type:'category'
          },
          yAxis:{
            type:'value'
          },
          series:[
            {
              name: '访客',
              type:'bar',
              encode:{x:0, y:1},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            }
          ]
        })
        let myLine = echarts.init(this.$refs.myline)
        myLine.setOption({
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
            trigger: 'axis'
          },
          dataset:{
            dimensions:['month','number'],
            source: this.company[this.choose_index].visitors_month
          },
          xAxis:{
            type:'category'
          },
          yAxis:{
            type:'value'
          },
          series:[
            {
              name: '访客',
              type:'line',
              encode:{x:0, y:1},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
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
            trigger: 'item'
          },
          dataset:{
            dimensions:['day','number'],
            source: this.company[this.choose_index].visitors_day
          },
          xAxis:{
            type:'category'
          },
          yAxis:{
            type:'value'
          },
          series:[
            {
              name: '访客',
              type:'bar',
              encode:{x:0, y:1},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            }
          ]
        })
        let myLine = echarts.init(this.$refs.myline)
        myLine.setOption({
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
            trigger: 'axis'
          },
          dataset:{
            dimensions:['day','number'],
            source: this.company[this.choose_index].visitors_day
          },
          xAxis:{
            type:'category'
          },
          yAxis:{
            type:'value'
          },
          series:[
            {
              name: '访客',
              type:'line',
              encode:{x:0, y:1},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            }
          ]
        })
      }
    },
    choose_name(newValue){
      this.choose_index = this.company.findIndex(item => item.name === newValue)
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
          trigger: 'item'
        },
        dataset:{
          dimensions:this.switch_value === true? ['month','number'] : ['day','number'],
          source: this.switch_value === true? this.company[this.choose_index].visitors_month : this.company[this.choose_index].visitors_day
        },
        xAxis:{
          type:'category'
        },
        yAxis:{
          type:'value'
        },
        series:[
          {
            name: '访客',
            type:'bar',
            encode:{x:0, y:1},
            itemStyle:{
              normal:{
                color: function (){
                  return '#4E62AB'
                }
              }
            }
          }
        ]
      })
      let myLine = echarts.init(this.$refs.myline)
      myLine.setOption({
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
          trigger: 'axis'
        },
        dataset:{
          dimensions:this.switch_value === true? ['month','number'] : ['day','number'],
          source: this.switch_value === true? this.company[this.choose_index].visitors_month : this.company[this.choose_index].visitors_day
        },
        xAxis:{
          type:'category'
        },
        yAxis:{
          type:'value'
        },
        series:[
          {
            name: '访客',
            type:'line',
            encode:{x:0, y:1},
            itemStyle:{
              normal:{
                color: function (){
                  return '#4E62AB'
                }
              }
            }
          }
        ]
      })
    }
  },
  methods: {
    getGuestNumber(){
      this.$axios({
        method: 'GET',
        url: '/getVisitorNumber'
      }).then( res => {
        console.log(res.data)
        this.company = res.data.data.company
        this.choose_name = this.company[0].name
        this.company_total = res.data.data.company_total
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
            trigger: 'item'
          },
          // legend:{
          //   top: 10,
          // },
          dataset:{
            dimensions:['month','number'],
            source: this.company[this.choose_index].visitors_month
          },
          xAxis:{
            type:'category'
          },
          yAxis:{
            type:'value'
          },
          series:[
            {
              name: '访客',
              type:'bar',
              encode:{x:0, y:1},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            }
          ]
        })
        let myLine = echarts.init(this.$refs.myline)
        myLine.setOption({
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
            trigger: 'axis'
          },
          dataset:{
            dimensions:['month','number'],
            source: this.company[this.choose_index].visitors_month
          },
          xAxis:{
            type:'category'
          },
          yAxis:{
            type:'value'
          },
          series:[
            {
              name: '访客',
              type:'line',
              encode:{x:0, y:1},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            }
          ]
        })
        let total_bar = echarts.init(this.$refs.total_bar)
        total_bar.setOption({
          title:{
            text: '公司总访客量',
            x: 'center'
          },
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
            trigger: 'item'
          },
          xAxis:{
            type:'category'
          },
          yAxis:{
            type:'value'
          },
          dataset:{
            dimensions:['name','number'],
            source: this.company_total
          },
          series:[
            {
              name: '访客量',
              type:'bar',
              encode:{x:0, y:1},
              itemStyle:{
                normal:{
                  color: function (){
                    return '#4E62AB'
                  }
                }
              }
            }
          ]
        })
      })
    }
  }
}
</script>

<style scoped>
.bar_charts{
  margin: 20px;
  width: 40%;
  height: 500px;
  /*border: 1px solid red;*/
  float: left;
}
.line_charts{
  /*top: 20px;*/
  width: 40%;
  height: 500px;
  margin: 20px;
  float: right;
}
.total_bar{
  width: 100%;
  height: 500px;
  float: right;
}
</style>