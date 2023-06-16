<template>
  <div class="divpadding">
    <div class="desLeft" >
    <el-card>
      
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:pink;">支付</span>
                <div>
                  <el-button @click="restartSakura">樱花开始运动</el-button>
                  <!-- <el-button @click="stopSakura">樱花停止运动</el-button> -->
                  <el-button @click="clearSakura">樱花清空</el-button>
                </div>
            </div>
        </template>

      <el-tabs v-model="activeName"  type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="微信支付" name="1">微信支付</el-tab-pane>
        <el-tab-pane label="支付宝支付" name="2">支付宝支付</el-tab-pane>
      </el-tabs>
      
      <img v-if="activeName==1" class="pictureMoney" src="@/assets/image/wx.jpg">
      <img v-if="activeName==2" class="pictureMoney" src="@/assets/image/zfb.jpg">


    </el-card>

    </div>
    <div class="desRight">
      <div style="margin:20px;">
        <h2>订单总额</h2>

        <div class="order">
          <div class="ordertop">
            <img class="orderimg" src="@/assets/image/h1.png">
            <div class="ordertitle">
              <h2>{{name}}</h2>
              <p>{{address}}</p>
              <p>{{size}}平方米</p>
            </div>
          </div>
          <div class="orderbottom">
            <div>租房的价格</div>
            <div class="bottombold">￥{{price}}</div>
          </div>
        </div>

        <div class="side">
            <div>租房月数</div>
            <div class="bottombold">{{month}}</div>
        </div>
        
        <div class="side">
            <div>手续费</div>
            <div class="bottombold">￥10</div>
        </div>

        <el-divider></el-divider>

        <div class="side">
            <div class="totalmoney">总计:</div>
            <div class="bottombold" style="font-size:18px;">￥{{month*price+10}}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {startSakura,stopp,clear} from './yinghua.js'
import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
      rid:9,
      oid:0,
      name:"北京豪宅",
      price:9999,
      address:"北京市 海淀区",
      size:200,
      month:2,
      activeName:"",
    }
  },
  mounted() {
    this.rid=this.$route.params.rid;
    this.oid=this.$route.params.oid;
    this.init();
    startSakura();
  },
  methods:{
    init(){
      var data={rid:this.rid};
      var that=this;
      console.log(data);
      this.$axios.post('/room/lookup_room/',JSON.stringify(data)).then(function (request){
        var content=request.data.content;
        that.name=content.name;
        that.size=content.size;
        that.price=content.price;
        that.address=content.address;
      })
      data={oid:this.oid};
      console.log(data);
      this.$axios.post('/order/lookup_order/',JSON.stringify(data)).then(function (request){
        var content=request.data.content;
        console.log(content)
        that.month=content.period/30;
      })

      data={oid:this.oid}
      setTimeout(()=>{
        this.$axios.post('/order/ensure_order/',JSON.stringify(data)).then(function (request){
          if(request.data.errno==0){
            ElMessage({
              message: "支付成功",
              type: 'success',
            }) 
          }
          else{
            ElMessage.error(request.data.msg)
          }
        })
      },10000)
      

    },
    restartSakura(){
        startSakura();
    },
    stopSakura(){
        stopp();
    },
    clearSakura(){
        clear();
    }
  },
  beforeRouteLeave() {
    clear();
    
  }
  

}
</script>

