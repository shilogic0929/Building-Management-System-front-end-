<template>
  <div>
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
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
            <div>{{ types[type] }}</div>
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
          <div style="margin-top:-15px;">
            <p>姓名：{{username}}</p>
            <p>电话：{{telephone}}</p>
          </div>
        </div>
      </el-card>

      <el-card>
        <div class = "card-header" style="margin-bottom:0px;">
          <span class="image-font" style="color:black;font-size:16px;">处理报修</span>

          <el-button type="primary" v-if="status==0" @click="serciceBegin()" round>进行处理</el-button>
          <el-button type="success" v-else-if="status==1" @click="visible=true">完成处理提交</el-button>
          <el-button type="info" v-else>已完成</el-button>
        </div>
      </el-card>
    </div>

    <el-dialog v-model="visible" title="报修记录提交" style="width: 40% !important; min-width: 100px !important;">
      <el-form label-position="right" label-width="120px" :model="form">
        <el-form-item label="解决人：">
          <el-input v-model="form.solver" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="解决时间：">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="解决办法：">
          <el-input type="textarea" v-model="form.solveWay"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="info" @click="visible = false">取消</el-button>
          <el-button type="primary" @click="finishDeal()">确认</el-button>
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
        img:require("@/assets/image/inner-banner6.png"),
        visible: false,
        uid:0,
        rid:0,
        wid:0,
        username:"张洪源",
        address:"",
        type:3,
        types: ["水","电","机械","其他"],
        telephone:18904672108,
        desc:"",
        value:"",
  
        status: 0,

        form: {
          //问题解决办法，解决时间，解决人
          solver: "",
          date1: "",
          date2: "",
          solveWay: ""
        }
    }
  },
  mounted() {
    this.uid=this.$route.params.uid;
    this.rid=this.$route.params.rid;
    this.wid=this.$route.params.wid;
    
    this.init();
    this.form.solver=this.username
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
    serciceBegin() {
      //change status to 1 -- in process
      this.status=1;
    },
    finishDeal() {
      //submit repair info
      if(this.form.solveWay&&this.form.date1&&this.form.date2)
      {
        
        this.visible = false
      }
      else
      {
        ElMessage({
                    message: "请完善维修信息",
                    type: 'warning',
                  })
      }
      
    }
  }
}
</script>