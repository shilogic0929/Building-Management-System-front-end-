<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
        <div class="zz">
            <h2>报修处理界面</h2>
        </div>
    </div>
    <div class="serviceGrid">
        <el-card>
            <template #header>
                <div class = "card-header" style = "margin:0px;">
                    <span class="image-font">报修申请列表</span>
                    <div>
                        <el-button class="button" type="text" @click="this.$router.go(-1)">返回</el-button>
                    </div>
                </div>
            </template>
            <div v-for="(item,index) in repair" :key="index">
                <div v-if="item.status==1">
                <div class="container">
                    <span class="title">报修{{item.wid}}</span>
                    <div>
                        <el-button type="primary" size="large" @click="seeRepair(index)">查看报修申请</el-button>
                        <!-- <el-button type="primary" size="large" >报修解决</el-button> -->
                    </div>
                </div>
                <el-divider></el-divider>
                </div>
            </div>
        </el-card>
    </div>

  </div>
</template>

<script>


export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner3.jpg"),
        visible:false,
        repair:[]
    }
  },
  mounted() {
      this.init();
  },
  methods:{
    init(){
        
      var data={name:"search_workorders"};
      var that=this;
      this.$axios.post('/workorder/search_workorders/',JSON.stringify(data)).then(function (request) {
          console.log(request.data.content);
          that.repair=request.data.content;
      })
    },
    seeRepair(index){
        this.$router.push({
          name: '报修内容界面',
          params: {
              uid:this.repair[index].uid,
              rid:this.repair[index].rid,
              wid:this.repair[index].wid,
          }
        })
    }
  }
  

}
</script>

