<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
        <div class="zz">
            <h2>报修信息界面</h2>
        </div>
    </div>

    <div class="desLeft" style="padding-bottom:20px;">
    <el-card >
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;">报修信息</span>
                <el-button type="primary" @click="this.$router.go(-1)">返回</el-button>
            </div>
      </template>
      
    <el-descriptions :column="1" :size="large" border>
    
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            房间id
          </div>
        </template>
        {{rid}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            房间地址
          </div>
        </template>
        {{address}}
      </el-descriptions-item>

      
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            报修类型
          </div>
        </template>
        <div v-if="type==1">墙壁损坏</div>
        <div v-if="type==2">房屋漏水</div>
        <div v-if="type==3">家电维修</div>
        <div v-else>其他</div>
      </el-descriptions-item>
  </el-descriptions>

  </el-card>

  <el-card>
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;">问题描述</span>
            </div>
      </template>
      <div class = "card-description">{{desc}}
      </div>
  </el-card>


  </div>


  <div class="desRight" style="padding-bottom:20px;">
    <el-card>
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;font-size:16px;">申请人</span>
            </div>
      </template>
      <div>
        <img class="tx" src="@/assets/image/头像1.jpg">
        <h2>{{username}}</h2>
        <div style="margin-top:5px;">
          <p>邮箱：{{email}}</p>
          <p>电话：{{telephone}}</p>
        </div>
      </div>
    </el-card>

    <el-card>
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;font-size:16px;">处理报修</span>
            </div>
      </template>
      <el-space>
      <el-select v-model="value" placeholder="请选择师傅">
                <el-option v-for="(item,index) in worker" :key="index" :label="item.username" :value="item.uid"></el-option>
        </el-select>
      <el-button type="primary" @click="assignWorker()">引入师傅</el-button>
      </el-space>
    </el-card>

  </div>


  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner6.jpg"),
        uid:0,
        rid:0,
        wid:0,
        username:"",
        address:"",
        type:"",
        telephone:18904672108,
        desc:"",
        email:"1741858932@qq.com",
        worker:[],
        value:"",
    }
  },
  mounted() {
    this.uid=this.$route.params.uid;
    this.rid=this.$route.params.rid;
    this.wid=this.$route.params.wid;
    this.init();
  },
  methods:{
    init(){
      var data={rid:this.rid};
      var that=this;
      this.$axios.post('/room/lookup_room/',JSON.stringify(data)).then(function (request) {
        var content=request.data.content;
        console.log(content)
        that.address=content.address;
      })

      data={username: this.$store.state.username};
      
      this.$axios.post('/user/lookup_user/',JSON.stringify(data)).then(function (request) {
        var content=request.data.content;
        console.log(content)
        that.username=content.name;
        that.email=content.email;
        that.telephone=content.mobile;
      })

      data={wid:this.wid};
      this.$axios.post('/workorder/lookup_workorder/',JSON.stringify(data)).then(function (request) {
        var content=request.data.content;
        console.log(content)
        that.type=content.type;
        that.desc=content.info;
      })

      data="search_users";
      this.$axios.post('/user/search_users/',JSON.stringify(data)).then(function (request) {
            console.log(request.data.content);
            for (var i=0; i<request.data.content.length; i++){
              if(request.data.content[i].worker){
                that.worker.push(request.data.content[i]);
              }
            }
            console.log(that.worker);
        })
      

    },
    assignWorker(){
      var data={
        worker:this.value,
        wid:this.wid
      };
      console.log(data)
      this.$axios.post('/workorder/assign_worker/',JSON.stringify(data)).then(function (request) {
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

