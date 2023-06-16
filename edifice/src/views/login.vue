<template>
  <div ref="mychart" class="demodiv"></div>
  <div ref="mychart2" class="demodiv"></div>
</template>

<script>
import * as echarts from "echarts"
export default {
  name: "login",
  data(){
    return{
      mydata: 3000
    }
  },
  mounted() {
    let myEcharts = echarts.init(this.$refs.mychart)
    myEcharts.setOption({
      title:{
        text:"helloworld",
        x: 'center',
      },
      tooltip:{},
      xAxis:{
        data:["EZ","VN","NOC","MF"]
      },
      yAxis:{

      },
      series:{
        name:"aaa",
        type:"bar",
        data:[this.mydata,4800,3200,600]
      }
    })
    let myEcharts2 = echarts.init(this.$refs.mychart2)
    myEcharts2.setOption({
      title:{
        text:"helloworld",
        x: 'center',
      },
      tooltip:{},
      xAxis:{
        data:["EZ","VN","NOC","MF"]
      },
      yAxis:{

      },
      series:{
        name:"aaa",
        type:"bar",
        data:[this.mydata,4800,3200,600]
      }
    })
  }
}
</script>

<style scoped>
.demodiv {
  width: 400px;
  height: 400px;
  border: 1px solid red;
  /*text-align: center;*/
}
</style>