<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
        <div class="zz">
            <h2>合同审核界面</h2>
        </div>
    </div>
    <div class="serviceGrid">
        <el-card>
            <template #header>
                <div class = "card-header" style = "margin:0px;">
                    <span class="image-font">合同列表</span>
                    <div>
                        <el-button class="button" type="text" @click="this.$router.go(-1)">返回</el-button>
                    </div>
                </div>
            </template>
            <div v-for="(item,index) in contract" :key="index">
                <div class="container">
                    <span class="title">合同{{item.ctid}}</span>
                    <div>
                        <el-button type="primary" size="large" @click="seeContract(item.uid,item.rid,item.ctid,item.startTime,item.price,item.period)">查看合同</el-button>
<!--                        <el-button type="primary" size="large" >审核通过</el-button>-->
<!--                        <el-button type="primary" size="large" >审核不通过</el-button>-->
                    </div>
                </div>
                <el-divider></el-divider>
            </div>
        </el-card>
    </div>

  </div>
</template>

<script>


export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner7.jpg"),
        visible:false,
        contract:[
        ]
    }
  },
  mounted() {
      this.init();
  },
  methods:{
    init(){
      var that=this;
      var data={order:"search_contracts"};
      this.$axios.post('/contract/search_contracts/',JSON.stringify(data)).then(function (request) {
        console.log(request.data.content)
        that.contract=request.data.content;
      })
    },
    seeContract(uid1,rid1,ctid1,startTime1,price1,period1){
       this.$router.push({
          name: '客服查看合同',
          params: {
            uid: uid1,
            rid:rid1,
            ctid:ctid1,
            startTime:startTime1,
            price:price1,
            period:period1
          }
        })
    }
  }
  

}
</script>

