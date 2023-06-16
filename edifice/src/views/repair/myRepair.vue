<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
        <div class="zz">
            <h2>查看个人报修申请</h2>
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
                <div class="container">
                    <span class="title">报修{{item.wid}}</span>
                    <div>
                        <el-button type="primary" size="large"  @click="see(index)">查看报修申请</el-button>
                        <el-button type="primary" size="large" @click="ensure(index)">报修解决</el-button>
                    </div>
                </div>
                <el-divider></el-divider>
            </div>
        </el-card>
    </div>

    <el-dialog v-model="visible">
        <el-descriptions :column="1" border>
      
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            报修房间编号
          </div>
        </template>
        {{rid}}
      </el-descriptions-item>


      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            报修类型
          </div>
        </template>
        {{type}}
      </el-descriptions-item>


      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            信息
          </div>
        </template>
        {{info}}
      </el-descriptions-item>

        </el-descriptions>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = true">取消</el-button>
                <el-button type="primary" @click="visible = false">确认</el-button>
            </span>
        </template>

    </el-dialog>

  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner3.jpg"),
        visible:false,
        rid:"",
        type:"",
        info:"",
        repair:[
            {
                wid: "1",
                id:0,
            },
            {
                wid: "2",
                id:0,
            }
        ]
    }
  },
  mounted() {
      this.init();
  },
  methods:{
    init(){
        
      var data={username: this.$store.state.username} 
      var that=this;
      let uid;
      this.$axios.post('/user/lookup_user/',JSON.stringify(data)).then(function (request) {
          console.log(request.data.content);
          uid = request.data.content.uid;
      })
      data={name:"search_workorders"};
      this.repair=[];
      this.$axios.post('/workorder/search_workorders/',JSON.stringify(data)).then(function (request) {
          console.log(request.data.content);
          for(var i=0; i<request.data.content.length; i++){
              if(request.data.content[i].uid==uid&&request.data.content[i].status==2){
                  that.repair.push(request.data.content[i])
              }
              
          }
      })
    },
    see(index){
        this.visible=true;
        this.rid=this.repair[index].rid;
        this.info=this.repair[index].info;

        if(this.repair[index].type==1)
          this.type="墙壁损坏";
        else if(this.repair[index].type==2)
          this.type="房屋漏水"
        else if(this.repair[index].type==3)
          this.type="家电维修"
        else if(this.repair[index].type==4)
          this.type="其他"
    },
    ensure(index){
      var data={wid: this.repair[index].wid} 
      this.$axios.post('/workorder/ensure_workorder/',JSON.stringify(data)).then(function (request) {
          console.log(request.data);
          if(request.data.errno==0){
                    ElMessage({
                      message: request.data.msg,
                      type: 'success',
                    }) 
            }
            else{
                ElMessage.error(request.data.msg)
            }
      })
    }
  }
  

}
</script>

