<template>
  <div class="login">

    <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="8"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="false"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
      </vue-particles>
      
    <!-- <div class="slideShadow" v-show="showSlide">
      <transition>
        <div class="slideSty animated bounce">
          <slide-verify @success="onSuccess" @fail="onFail"></slide-verify>
          <div class="iconBtn">
            <i class="el-icon-circle-close" @click="showSlide = false"></i>        
            <i class="el-icon-refresh" @click="refresh"></i>
          </div>
        </div>
      </transition>
    </div> -->
    <div class="loginBox">
      <h2 class="loginH2"><strong>大厦</strong>物业管理系统</h2>
      <div class="loginCon">
        <div class="titleDiv">


          <i class="el-icon-key"></i>
        </div>
        <el-form ref="loginForm" :rules="rules" :model="ruleForm">
          <el-form-item prop="username">
            <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="ruleForm.username"></el-input>
          </el-form-item>
<!--          <el-form-item prop="telephone" v-if="dialogVisible">-->
<!--            <el-input placeholder="请输入电话" prefix-icon="el-icon-lock" v-model="ruleForm.telephone"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item prop="mail" v-if="dialogVisible">-->
<!--            <el-input placeholder="请输入邮箱" prefix-icon="el-icon-lock" v-model="ruleForm.mail"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
<!--          <el-form-item prop="password2" v-if="dialogVisible">-->
<!--            <el-input placeholder="请再次输入密码" prefix-icon="el-icon-lock" v-model="ruleForm.password2" show-password></el-input>-->
<!--          </el-form-item>-->
          <el-row gutter="10">
            <el-col :span="12">

              <el-button
                          color="#2b4a85"  class="loginBtn" @click="login()">登录</el-button>

            </el-col>
<!--            <el-col :span="12">-->
<!--              <el-button color="#2b4a85"  class="loginBtn" @click="register()">注册</el-button>-->
<!--            </el-col>-->
          </el-row> 
        </el-form>
      </div>
    </div>

    <!-- <div class="register">
      <el-dialog  v-model="dialogVisible" width="40%">
        <div class="r_image">
            <p>请注册</p>
        </div>
        <div class="r_form">
          <el-form>


          </el-form>
        </div>
      </el-dialog>

    </div> -->

    

  </div>
</template>

<script>
// import axios from 'axios'


export default {
  
  data() {
    let num =  /^[0-9a-zA-Z_]{1,}$/;
    let validatePass = (rule, value, callback) => {
          if (!num.test(value)) {
            return callback(new Error('密码只能是字母数字下划线'))
          } 
          else {
            callback()
          }
    };
    return {
      notifyObj: null,
      text: "向右滑动",
      showSlide: false,
      dialogVisible:false,
      ruleForm: {
        username: "",
        telephone: "",
        mail:"",
        password: "",
        password2:"",
      },

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在3到5个字符", trigger: "blur" }
        ],
        telephone:[{required: true, message: "请输入电话", trigger: "blur" }],
        mail:[{required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },
                  // { min: 8, message: "长度至少超过8位", trigger: "blur" },
                  { validator: validatePass},  
                  ],
        // password2: [{ required: true, message: "请再次输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
      this.init();
  },
  methods: {
    init() {
        console.log("start");
        // 实例化socket
        //   this.socket=this.global.ws;
        //
        //   this.socket.onopen = this.open;
        //   // 监听socket错误信息
        //   this.socket.onerror = this.error;
        //   this.socket.onclose = this.close;
        //   this.socket.onmessage = this.getInput;

          // let data={};
          // var that=this;


      //
      // const formData = new FormData()
      // formData.append('id',that.dialog_person.id)
      // this.$axios({
      //   method:'POST',
      //   url: '',
      //   data: formData
      // }).then（res => {}


          // this.$axios.post('/login',JSON.stringify(data)).then(function (request) {
          //   console.log(request);
          //   if(request.data.msg=="用户已登录"){
          //     that.$router.push({
          //             name: "首页",
          //             params:{
          //
          //             }
          //         });
          //   }
          // })
      },
      // open() {
      //   this.flag=1;
      //   console.log("socket连接成功");
      // },
      // send(ms) {
      //   this.socket.send(ms);
      // },
      getInput(){
        
      },
      // socket连接失败
    //   error() {
    //     console.log("连接错误");
    //
    //   },
    //   close () {
    //     console.log("socket已经关闭")
    //   },
    // onSuccess(){
    //   this.msg = 'login success'
    // },
    // onFail(){
    //   this.msg = ''
    // },
    // refresh() {
    //   this.$refs.slideDiv.reset();
    // },
    // loginYz(form) {
    //   this.$refs[form].validate(valid => {
    //     if (valid) {
    //       this.showSlide = true;
    //     } else {
    //       return;
    //     }
    //   });
    // },
    login() {
      const formData = new FormData()
      formData.append('email',this.ruleForm.username)
      formData.append('password',this.ruleForm.password)
      this.$axios({
        method: 'POST',
        url:'/login',
        data: formData
      }).then( res =>{

        if(res.data.errno === 0){
          localStorage.setItem('token',res.data.data.token)
          localStorage.setItem('type',res.data.data.type)
          // var naid = localStorage.getItem("token");
          // console.log(naid)
          // console.log(res.data.data)
          if(res.data.data.type === 0){//普通人员
            // this.$router.push('/myRepair')
            this.$router.push('/woIn')
          }
          else if(res.data.data.type === -1){//管理人
            this.$router.push('/woIn')
            // this.$router.push('/handleRepair')
          }
          else{//维修人员
            this.$router.push('/woIn')
            // this.$router.push('/handleRepair')
          }
        }
      })
        // if(this.dialogVisible==true){
        //   this.dialogVisible=false;
        // }
        // else{
      //     let data={
      //       username:this.ruleForm.username,
      //       password:this.ruleForm.password,
      //     }
      //     this.$store.commit("changeName",data.username);
      //     console.log(this.$store.state);
      //     var that=this;
      //     this.$refs["loginForm"].validate((valid) => {
      //       if (valid) {
      //           this.$axios.post('https://mock.apifox.cn/m1/2881677-0-default/test/login',JSON.stringify(data)).then(function (request) {
      //             console.log(request.data);
      //             if(request.errno==0){
      //               var imgs = request.data.token;  //声明个变量存储下数据
      //               localStorage.setItem('token',imgs);
      //               var imgs1 = request.data.user_id;  //声明个变量存储下数据
      //               localStorage.setItem('user_id',imgs1);
      //               var imgs2 = request.data.email;  //声明个变量存储下数据
      //               localStorage.setItem('email',imgs2);
      //               ElMessage({
      //                 message: request.msg,
      //                 type: 'success',
      //               })
      //               // that.$store.state.isService=request.data.admin;
      //               // that.$store.state.isWorker=request.data.worker;
      //               // var data ={
      //               //   isService:that.$store.state.isService,
      //               //   username:that.$store.state.username,
      //               // }
      //               // sessionStorage.setItem("state",JSON.stringify(data));
      //
      //               that.$router.push({
      //                 name: "首页",
      //                 params:{
      //
      //                 }
      //               });
      //
      //             }
      //             else{
      //               ElMessage.error(request.data.msg)
      //             }
      //           })
      //
      //
      //
      //       }
      //       else{
      //         ElMessage.error("请填完表单")
      //       }
      //     });
      //
      //
      //
      // }
      //
      //     // if (this.notifyObj) {
      //     //   this.notifyObj.close();
      //     // }
      //     this.notifyObj = null;
      //
          
        
    },
    // register(){
    //   if(this.dialogVisible==false){
    //     this.dialogVisible=true;
    //   }
    //   else{
    //     let data={
    //       username:this.ruleForm.username,
    //       email:this.ruleForm.mail,
    //       password_1:this.ruleForm.password,
    //       password_2:this.ruleForm.password2,
    //       mobile:this.ruleForm.telephone,
    //     }
    //
    //     // console.log(data);
    //
    //     this.$refs["loginForm"].validate((valid) => {
    //       if (valid) {
    //         this.$axios.post('/user/register/',JSON.stringify(data)).then(function (request) {
    //           console.log(request.data);
    //           if(request.data.errno==0){
    //             ElMessage({
    //               message: request.data.msg,
    //               type: 'success',
    //             })
    //           }
    //           else{
    //             ElMessage.error(request.data.msg)
    //           }
    //         }).catch(function () {
    //
    //         });
    //       }
    //       else{
    //           ElMessage.error("请填完表单")
    //         }
    //     });
    //   }
    // },
  },
  
  // watch: {
  //   // 刷新验证框
  //   showSlide(val) {
  //     if (!val) {
  //       this.refresh();
  //     }
  //   }
  // }
};
</script>
