<template>
  <div class="MHeader">
    <div class="headLeft" id="headl">
      <el-button @click="collapse()">
        <el-icon :size="25">
          <expand />
        </el-icon>
      </el-button>
    </div>
    <div class="headRight">
      <div class="headTitle">大厦物业管理系统</div>
      <div class="personalHome">
        <el-dropdown>
          <!-- <div class="userDrop_text">exit</div> -->
          <el-icon :size="15" class="userDrop">
            <user />
          </el-icon>
          <el-avatar :size="30">
            <el-icon :size="25" :color="color">
              <avatar />
            </el-icon>
          </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/dashboard">
                <el-dropdown-item :icon="House">首页</el-dropdown-item>
              </router-link>
              <router-link to="/personalPage">
                <el-dropdown-item :icon="UserFilled">个人信息</el-dropdown-item>
              </router-link>
              <el-dropdown-item :icon="SwitchButton" @click="quit">注销</el-dropdown-item>
              <el-dropdown-item :icon="Message" v-model="user_type" @click="showDlg">访客申请</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="访客申请" width="60%" draggable>
      <el-card class="input-card">
        <div>申请表单: </div>
        <div style="margin: 20px" />
        <el-form :label-position="top" label-width="100px" :rules="rules" ref="input" style="max-width: 800px">
          <el-form-item label="姓名">
            <el-input v-model="input.user_name" />
          </el-form-item>
          <el-form-item label="身份证号码" prop="idNumber">
            <el-input v-model="input.user_id" />
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="input.phone_num" />
          </el-form-item>
          <el-form-item label="访问时间">
            <div class="block">
              <el-date-picker v-model="input.visit_time" type="datetime" placeholder="选择日期和时间" />
            </div>
          </el-form-item>
        </el-form>
      </el-card>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">
            取消
            <el-icon>
              <CircleClose />
            </el-icon>
          </el-button>
          <el-button class="submit" size="middle" @click="submitInput(input)">
            提交
            <el-icon>
              <Promotion />
            </el-icon>
          </el-button>
        </span>
      </template>
    </el-dialog>
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
  SwitchButton, User,
  Message,
} from '@element-plus/icons-vue'

export default {
  data() {
    return {
      color: "#009966",
      userName: "",
      Plus: Plus,
      Check: Check,
      CircleCheck: CircleCheck,
      Setting: Setting,
      UserFilled: UserFilled,
      House: House,
      Guide: Guide,
      SwitchButton: SwitchButton,
      Message: Message,
      user_type: false,
      dialogVisible: false,
      input: {
        user_name: "",
        user_id: "",
        phone_num: "",
        visit_time: "",
      },
      rules: {
        phone: [
          { required: true },
          // 这个只能验证手机号
          // { pattern:/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: "请输入合法手机号", trigger: "blur" }
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }
        ],
        idNumber: [
          { required: true },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: "请输入合法身份证号", trigger: "blur" }
        ],
      }
    }
  },
  created() {
    this.user_type = localStorage.getItem('type') == 0 ? true : false;
  },
  mounted() {

    this.userName = this.$store.state.username
  },
  methods: {
    collapse() {
      console.log(this.$store.state.isCollapsed);
      this.$store.commit('changeCollapsed', !this.$store.state.isCollapsed);
      // window.document.getElementById('headl').setAttribute("width","5%");
    },
    quit() {
      console.log("quit");
      localStorage.setItem('token', 0);
      var naid = localStorage.getItem("token");
      console.log(naid);
      // this.$axios.post('/user/logout/',JSON.stringify()).then(function (request) {
      //    ElMessage({
      //       message: request.data.msg,
      //       type: 'success',
      //     })
      // });
      this.$router.push("/login")
    },
    showDlg() {
      this.dialogVisible = true;
    },
    submitInput(input) {
      if (input.user_name === '') {
        this.$message("请输入您的姓名")
        return
      }
      if (input.user_id === '') {
        this.$message("请输入您的身份证号码")
        return
      }
      if (input.phone_num === '') {
        this.$message("请输入您的联系电话")
        return
      }
      if (input.user_id === '') {
        this.$message("请输入您的身份证号码")
        return
      }
      if (input.visit_time === '') {
        this.$message("请设置访问时间")
        return
      }
      let date = new Date(input.visit_time).toLocaleDateString()
      let time = new Date(input.visit_time).toLocaleTimeString()
      // let dateTime = date + ' ' + time
      let dateTime = date.split("/").join("-") + ' ' + time
      console.log(dateTime)
      const formData = new FormData()
      formData.append('token', localStorage.getItem('token'))
      formData.append('user_name', input.userName)
      formData.append('user_id', input.user_id)
      formData.append('phone_num', input.phone_num)
      formData.append('visit_time', dateTime)
      this.$axios({
        method: 'POST',
        url: '/userApply',
        data: formData
      }).then(res => {
        if (res.status !== 200 && res.data.success == false) {
          this.$message.error('提交失败：' + res.statusText);
          return;
        } else {
          this.$message.success('提交成功')
          this.dialogVisible = false;
        }
      })
    }
  },
  watch: {
    monitor() {
      this.userName = this.$store.state.username;
    }
  },
  component: {
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
<style>
.icon {
  top: 5px;
  cursor: pointer;
}
</style>