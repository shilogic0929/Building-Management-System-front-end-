<template>
  <el-card>
    <template #header>
      <div class = "card-header" style="margin-bottom:0px;">
        <div class="image-font" style="font-size:20px; margin: 0 auto">访客数量统计</div>
      </div>
      <div style="text-align: left">
        <div style="width: 200px;text-align: center">
          <el-switch
              v-model="switch_value"
              class="mb-2"
              active-text="展示月份"
              inactive-text="展示日期"
          />
        </div>
      </div>
      <el-select v-model="choose_name" filterable :placeholder=this.company[this.choose_index].name>
        <el-option
            v-for="item in company"
            :key="item.name"
            :label="item.name"
            :value="item.name">
        </el-option>
      </el-select>

      <div ref="mybar" class="bar_charts"></div>
      <div ref="myline" class="line_charts"></div>
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
        {
          name:'拾倡晾捻拌',
          visitors_day: [
            {
              day: '2020-05-21',
              number: 3
            },
            {
              day:'2020-05-22',
              number: 2
            },
            {
              day: '2020-05-23',
              number: 5
            },
            {
              day: '2020-05-24',
              number: 2
            },
            {
              day: '2020-05-25',
              number: 4
            },
            {
              day: '2020-05-26',
              number: 2
            },
            {
              day: '2020-05-27',
              number: 6
            },
            {
              day: '2020-05-28',
              number: 7
            },
            {
              day:'2020-05-29',
              number: 4
            },
            {
              day: '2020-05-30',
              number: 8
            },
            {
              day: '2020-05-31',
              number: 5
            },
            {
              day: '2020-06-01',
              number: 2
            },
            {
              day: '2020-06-02',
              number: 5
            },
            {
              day: '2020-06-03',
              number: 2
            },
          ],
          visitors_month: [
            {
              month:'2020-02',
              number: 12
            },
            {
              month:'2020-03',
              number: 23
            },
            {
              month: '2020-04',
              number: 15
            },
            {
              month: '2020-05',
              number: 13
            },
            {
              month: '2020-06',
              number: 16
            },
            {
              month: '2020-07',
              number: 17
            },
            {
              month: '2020-08',
              number: 32
            },
            {
              month: '2020-09',
              number: 23
            },
            {
              month: '2020-10',
              number: 34
            },
            {
              month: '2020-11',
              number: 25
            },
            {
              month: '2020-12',
              number: 26
            },
            {
              month: '2021-01',
              number: 28
            },
          ],
        },
        {
          name:'碑记年逾',
          visitors_day: [
            {
              day: '2020-05-21',
              number: 5
            },
            {
              day:'2020-05-22',
              number: 1
            },
            {
              day: '2020-05-23',
              number: 1
            },
            {
              day: '2020-05-24',
              number: 3
            },
            {
              day: '2020-05-25',
              number: 1
            },
            {
              day: '2020-05-26',
              number: 2
            },
            {
              day: '2020-05-27',
              number: 4
            },
            {
              day: '2020-05-28',
              number: 5
            },
            {
              day:'2020-05-29',
              number: 1
            },
            {
              day: '2020-05-30',
              number: 1
            },
            {
              day: '2020-05-31',
              number: 3
            },
            {
              day: '2020-06-01',
              number: 1
            },
            {
              day: '2020-06-02',
              number: 2
            },
            {
              day: '2020-06-03',
              number: 4
            },
          ],
          visitors_month: [
            {
              month:'2020-02',
              number: 32
            },
            {
              month:'2020-03',
              number: 53
            },
            {
              month: '2020-04',
              number: 26
            },
            {
              month: '2020-05',
              number: 36
            },
            {
              month: '2020-06',
              number: 34
            },
            {
              month: '2020-07',
              number: 28
            },
            {
              month: '2020-08',
              number: 25
            },
            {
              month: '2020-09',
              number: 26
            },
            {
              month: '2020-10',
              number: 23
            },
            {
              month: '2020-11',
              number: 22
            },
            {
              month: '2020-12',
              number: 31
            },
            {
              month: '2021-01',
              number: 43
            },
          ],
        },
        {
          name:'长条挼噗',
          visitors_day: [
            {
              day: '2020-05-21',
              number: 5
            },
            {
              day:'2020-05-22',
              number: 3
            },
            {
              day: '2020-05-23',
              number: 4
            },
            {
              day: '2020-05-24',
              number: 6
            },
            {
              day: '2020-05-25',
              number: 8
            },
            {
              day: '2020-05-26',
              number: 3
            },
            {
              day: '2020-05-27',
              number: 7
            },
            {
              day: '2020-05-28',
              number: 5
            },
            {
              day:'2020-05-29',
              number: 3
            },
            {
              day: '2020-05-30',
              number: 6
            },
            {
              day: '2020-05-31',
              number: 6
            },
            {
              day: '2020-06-01',
              number: 3
            },
            {
              day: '2020-06-02',
              number: 1
            },
            {
              day: '2020-06-03',
              number: 3
            },
          ],
          visitors_month: [
            {
              month:'2020-02',
              number: 42
            },
            {
              month:'2020-03',
              number: 65
            },
            {
              month: '2020-04',
              number: 33
            },
            {
              month: '2020-05',
              number: 48
            },
            {
              month: '2020-06',
              number: 53
            },
            {
              month: '2020-07',
              number: 22
            },
            {
              month: '2020-08',
              number: 43
            },
            {
              month: '2020-09',
              number: 34
            },
            {
              month: '2020-10',
              number: 22
            },
            {
              month: '2020-11',
              number: 16
            },
            {
              month: '2020-12',
              number: 33
            },
            {
              month: '2021-01',
              number: 42
            },
          ],
        },
        {
          name:'指引逆炱枚',
          visitors_day: [
            {
              day: '2020-05-21',
              number: 5
            },
            {
              day:'2020-05-22',
              number: 5
            },
            {
              day: '2020-05-23',
              number: 3
            },
            {
              day: '2020-05-24',
              number: 2
            },
            {
              day: '2020-05-25',
              number: 5
            },
            {
              day: '2020-05-26',
              number: 1
            },
            {
              day: '2020-05-27',
              number: 6
            },
            {
              day: '2020-05-28',
              number: 7
            },
            {
              day:'2020-05-29',
              number: 4
            },
            {
              day: '2020-05-30',
              number: 5
            },
            {
              day: '2020-05-31',
              number: 2
            },
            {
              day: '2020-06-01',
              number: 6
            },
            {
              day: '2020-06-02',
              number: 3
            },
            {
              day: '2020-06-03',
              number: 5
            },
          ],
          visitors_month: [
            {
              month:'2020-02',
              number: 27
            },
            {
              month:'2020-03',
              number: 43
            },
            {
              month: '2020-04',
              number: 21
            },
            {
              month: '2020-05',
              number: 43
            },
            {
              month: '2020-06',
              number: 57
            },
            {
              month: '2020-07',
              number: 23
            },
            {
              month: '2020-08',
              number: 43
            },
            {
              month: '2020-09',
              number: 33
            },
            {
              month: '2020-10',
              number: 24
            },
            {
              month: '2020-11',
              number: 15
            },
            {
              month: '2020-12',
              number: 32
            },
            {
              month: '2021-01',
              number: 46
            },
          ]
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
      const that = this
      this.$axios({
        method: 'GET',
        url: '/getVisitorNumber'
      }).then( res => {
        console.log(res.data.data)
        this.company = res.data.data
        this.choose_name = this.company[0].name
        console.log(this.company)
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
      })
    }
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
  /*float: left;*/
}
</style>