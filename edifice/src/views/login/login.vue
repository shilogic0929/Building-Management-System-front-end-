<template>
  <div class="login">

    <vue-particles color="#fff" :particleOpacity="0.7" :particlesNumber="100" shapeType="circle" :particleSize="8"
      linesColor="#fff" :linesWidth="1" :lineLinked="false" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2"
      :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi">
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
      <div class="loginCon">

        <div class="titleDiv">
          <h2 class="loginH2" style="position: relative;top:45px"><strong>大厦</strong>物业管理系统</h2>

        </div>
        <el-form ref="loginForm" :rules="rules" :model="ruleForm">
          <el-form-item prop="username">
            <el-input placeholder="请输入账号" :prefix-icon="User" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <!--          <el-form-item prop="telephone" v-if="dialogVisible">-->
          <!--            <el-input placeholder="请输入电话" prefix-icon="el-icon-lock" v-model="ruleForm.telephone"></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item prop="mail" v-if="dialogVisible">-->
          <!--            <el-input placeholder="请输入邮箱" prefix-icon="el-icon-lock" v-model="ruleForm.mail"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" :prefix-icon="Lock" v-model="ruleForm.password" show-password
              @keyup.enter.native="login()"></el-input>

          </el-form-item>


          <!--          <el-form-item prop="password2" v-if="dialogVisible">-->
          <!--            <el-input placeholder="请再次输入密码" prefix-icon="el-icon-lock" v-model="ruleForm.password2"-->
          <!--              show-password></el-input>-->
          <!--          </el-form-item>-->
          <el-row gutter="10">
            <el-col :span="12">

              <el-button color="#2b4a85" class="loginBtn" @click="login()">登录</el-button>

            </el-col>
            <!--            <el-col :span="12">-->
            <!--              <el-button color="#2b4a85" class="loginBtn" @click="register()">注册</el-button>-->
            <!--            </el-col>-->
          </el-row>
        </el-form>
      </div>
    </div>

    <!--    <div class="register">-->
    <!--      <el-dialog  v-model="dialogVisible" width="40%">-->
    <!--        <div class="r_image">-->
    <!--            <p>请注册</p>-->
    <!--        </div>-->
    <!--        <div class="r_form">-->
    <!--          <el-form>-->


    <!--          </el-form>-->
    <!--        </div>-->
    <!--      </el-dialog>-->

    <!--    </div>-->



  </div>
</template>

<script setup>
import { Lock } from '@element-plus/icons-vue'
import { User } from '@element-plus/icons-vue'
</script>

<script>
import axios from 'axios'
import router from "@/router";
import { ElMessage } from 'element-plus'


export default {

  data() {
    let num = /^[0-9a-zA-Z_]{1,}$/;
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
      dialogVisible: false,
      ruleForm: {
        username: "",
        telephone: "",
        mail: "",
        password: "",
        password2: "",
      },

      // rules: {
      //   username: [
      //     { required: true, message: "请输入用户名", trigger: "blur" },
      //     { min: 3, max: 15, message: "长度在3到5个字符", trigger: "blur" }
      //   ],
      //   telephone: [{ required: true, message: "请输入电话", trigger: "blur" }],
      //   mail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      //   password: [{ required: true, message: "请输入密码", trigger: "blur" },
      //   { min: 8, message: "长度至少超过8位", trigger: "blur" },
      //   { validator: validatePass },
      //   ],
      // password2: [{ required: true, message: "请再次输入密码", trigger: "blur" }]
      // }
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
    getInput() {

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
    login() {
      const formData = new FormData()
      formData.append('email', this.ruleForm.username)
      formData.append('password', this.ruleForm.password)
      this.$axios({
        method: 'POST',
        url: '/login',
        data: formData
      }).then(res => {

        if (res.data.errno === 0) {
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('type', res.data.data.type)
          if (res.data.data.type === 0) {//普通人员
            this.$router.push('/myRepair')
          }
          else if (res.data.data.type === -1) {//管理人
            this.$router.push('/handleRepair')
          }
          else {//维修人员
            this.$router.push('/repairService')
          }
          console.log(res.data.data.type);
        }
      })
    },

    // register() {
    //   if (this.dialogVisible == false) {
    //     this.dialogVisible = true;
    //   }
    //   else {
    //     let data = {
    //       username: this.ruleForm.username,
    //       email: this.ruleForm.mail,
    //       password_1: this.ruleForm.password,
    //       password_2: this.ruleForm.password2,
    //       mobile: this.ruleForm.telephone,
    //     }
    //
    //     // console.log(data);
    //
    //     this.$refs["loginForm"].validate((valid) => {
    //       if (valid) {
    //         this.$axios.post('/user/register/', JSON.stringify(data)).then(function (request) {
    //           console.log(request.data);
    //           if (request.data.errno == 0) {
    //             ElMessage({
    //               message: request.data.msg,
    //               type: 'success',
    //             })
    //           }
    //           else {
    //             ElMessage.error(request.data.msg)
    //           }
    //         }).catch(function () {
    //
    //         });
    //       }
    //       else {
    //         ElMessage.error("请填完表单")
    //       }
    //     });
    //   }
    // },

  },

};
</script>