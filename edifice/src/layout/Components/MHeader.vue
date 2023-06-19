<template>
    <div class="MHeader">
      <div class="headLeft" id="headl">
        <el-button @click="collapse()">
          <el-icon :size="25"><expand /></el-icon>
        </el-button>
      </div>
      <div class="headRight">
        <div class="headTitle">青年租房管理系统</div>
          <div class="personalHome">
            <el-dropdown>
              <div class="userDrop_text">exit</div>
              <el-icon :size="15" class="userDrop"><caret-bottom /></el-icon>
              <el-avatar :size="30">
                <el-icon :size="25" :color="color"><avatar /></el-icon>
              </el-avatar>
              <template #dropdown>
                <el-dropdown-menu>
                  <router-link to="/dashboard">
                    <el-dropdown-item :icon="House">首页</el-dropdown-item>
                  </router-link>


                  <el-dropdown-item :icon="SwitchButton" @click="quit">注销</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

      </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
  import {
    Check,
    CircleCheck,
    Setting,
    UserFilled,
    Plus,
    House,
    Guide,
    SwitchButton
  } from '@element-plus/icons-vue'

  export default {
    data(){
      return{
        color:"#009966",
        userName:"",
        Plus:Plus,
        Check:Check,
        CircleCheck:CircleCheck,
        Setting:Setting,
        UserFilled:UserFilled,
        House:House,
        Guide:Guide,
        SwitchButton:SwitchButton
      }
    },
    mounted() {
      
      this.userName=this.$store.state.username
    },
    methods:{
        
        collapse(){
          console.log(this.$store.state.isCollapsed);
          this.$store.commit('changeCollapsed',!this.$store.state.isCollapsed);
          // window.document.getElementById('headl').setAttribute("width","5%");
        },
        quit(){
          console.log("quit");
          this.$axios.post('/user/logout/',JSON.stringify()).then(function (request) {
             ElMessage({
                message: request.data.msg,
                type: 'success',
              }) 
          });
          this.$router.push("/login")
        }
    },  
   watch: {
      monitor () {
        this.userName=this.$store.state.username;
      }
    },
    component:{
      Check,
      CircleCheck,
      Setting,
      UserFilled,
      Plus,
      House,
      Guide,
      SwitchButton,
    }


  }
</script>
