<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
      <div class="zz">
        <h2>查看用户信息界面</h2>
      </div>
    </div>
    <div class="serviceGrid">
      <el-card>
        <template #header>
          <div class = "card-header" style = "margin:0px;">
            <span class="image-font">用户列表</span>
            <div>
              <!--  <el-button type="text" size="large" @click="addHouse">添加用户</el-button> -->
              <el-button class="button" type="text" @click="this.$router.go(-1)">返回</el-button>
            </div>
          </div>
        </template>
        <div v-for="(item,index) in users" :key="index">
          <div class="container">
            <span class="title">{{item.username}}</span>
            <div>
              <el-button type="primary" size="large" @click="seeUser(index)">查看用户详细信息</el-button>
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
            用户名
          </div>
        </template>
        {{form.username}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            用户id
          </div>
        </template>
        {{form.uid}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Wallet />
            </el-icon>
            邮件
          </div>
        </template>
        {{form.email}}
      </el-descriptions-item>
      
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            电话
          </div>
        </template>
        <span>{{form.mobile}}</span>
      </el-descriptions-item>
  </el-descriptions>
    
    
    
    </el-dialog>

  </div>
</template>

<script>


export default {
  data(){
    return{
      img:require("@/assets/image/inner-banner7.jpg"),
      visible:false,
      users:[
        {
          name: "用户1",
          id:0,
        },
        {
          name: "用户2",
          id:0,
        }
      ],
      form:{
        username:"",
        uid:0,
        email: "",
        mobile:"",
      }
    }
  },
  mounted() {
    this.init();
  },
  methods:{
     init(){
        var data="search_users";
        var that=this;
        this.$axios.post('/user/search_users/',JSON.stringify(data)).then(function (request) {
            console.log(request.data.content);
            that.users=request.data.content;
        })
      
    },
    seeUser(index){
      this.visible=true;
      this.form.username=this.users[index].username;
      this.form.uid=this.users[index].uid;
      this.form.email=this.users[index].email;
      this.form.mobile=this.users[index].mobile;
    }
  }


}
</script>

