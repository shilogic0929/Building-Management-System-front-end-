<template>
  <div class="MHeader">
    <div class="headLeft" id="headl">
      <el-button @click="collapse()">
        <el-icon :size="25">
          <Expand v-if="this.$store.state.isCollapsed" />
          <Fold v-else />
        </el-icon>
      </el-button>
    </div>
    <div class="headRight">
      <div class="headTitle">致真大厦物业管理系统</div>
      <div class="personalHome">
        <el-dropdown>
          <!-- <div class="userDrop_text">exit</div> -->
          <el-icon :size="22" class="userDrop">
            <user />
          </el-icon>
          <el-avatar :size="30">
            <el-icon :size="25" :color="color">
              <avatar />
            </el-icon>
          </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/homeView">
                <el-dropdown-item :icon="House">首页</el-dropdown-item>
              </router-link>
              <router-link to="/personalPage">
                <el-dropdown-item :icon="UserFilled" v-show="user_type === '-1'">个人信息</el-dropdown-item>
              </router-link>
              <el-dropdown-item :icon="SwitchButton" @click="quit">注销</el-dropdown-item>
              <!-- <el-dropdown-item :icon="Message" v-model="user_type" @click="showDlg">访客申请</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- <body>
      <el-dialog v-model="dialogVisible" title="访客申请" width="60%" draggable class="dlg" append-to-body="true">
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
            <el-form-item label="访问时间" style="margin-top: 20px;">
              <div class="block">
                <el-date-picker v-model="input.visit_time" type="datetime" placeholder="选择日期和时间" />
              </div>
            </el-form-item>
          </el-form>
          <span class="dialog-footer" style="padding-left: 100px">
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
        </el-card>
        <el-card style="margin-top: 20px;!important" v-model="showActivities">
          <span>申请处理进度</span>
          <div class="block">
            <el-timeline>
              <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp"
                :color="activity.color" :hollow="activity.hollow">
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
        <template #footer>
          <el-button @click="dialogVisible = false">
            <el-icon>
              <CircleClose />
            </el-icon>
          </el-button>
        </template>
      </el-dialog>
    </body> -->
  </div>
</template>

<script>
// import { ElMessage } from 'element-plus'
import {
  Check,
  CircleCheck,
  Setting,
  UserFilled,
  Plus,
  House,
  Guide,
  SwitchButton,
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
          { required: false },
          // 这个只能验证手机号
          // { pattern:/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: "请输入合法手机号", trigger: "blur" }
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }
        ],
        idNumber: [
          { required: false },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: "请输入合法身份证号", trigger: "blur" }
        ],
      },
      activities: [{
        content: '申请时间',
        timestamp: '',
        color: '',
        hollow: true
      }, {
        content: '通过审核',
        timestamp: '',
        color: '',
        hollow: true
      }, {
        content: '访问时间',
        timestamp: '',
        hollow: true
      }],
      showActivities: false,
    }
  },
  created() {
    this.user_type = localStorage.getItem('type') == 0 ? true : false;
    //getActivityList();
    if (this.activities.length > 0) {
      this.showActivities = true
    }
  },
  mounted() {
    this.userName = this.$store.state.username;
  },
  methods: {
    collapse() {
      console.log(this.$store.state.isCollapsed);
      this.$store.commit('changeCollapsed', !this.$store.state.isCollapsed);
      // window.document.getElementById('headl').setAttribute("width","5%");
    },
    quit() {
      console.log("quit");
      localStorage.clear();
      // var naid = localStorage.getItem("token");
      // console.log(naid);
      // this.$axios.post('/user/logout/',JSON.stringify()).then(function (request) {
      //    ElMessage({
      //       message: request.data.msg,
      //       type: 'success',
      //     })
      // });
      this.$router.push("/login")
    },
    // showDlg() {
    //   this.dialogVisible = true;
    // },
    // submitInput(input) {
    //   if (input.user_name === '') {
    //     this.$message("请输入您的姓名")
    //     return
    //   }
    //   if (input.user_id === '') {
    //     this.$message("请输入您的身份证号码")
    //     return
    //   }
    //   if (input.phone_num === '') {
    //     this.$message("请输入您的联系电话")
    //     return
    //   }
    //   if (input.user_id === '') {
    //     this.$message("请输入您的身份证号码")
    //     return
    //   }
    //   if (input.visit_time === '') {
    //     this.$message("请设置访问时间")
    //     return
    //   }
    //   let date = new Date()
    //   let day = date.toLocaleDateString()
    //   let time = date.toLocaleTimeString()
    //   let dateTime = day.split("/").join("-") + ' ' + time
    //   this.activities[0].timestamp = dateTime
    //   this.activities[0].color = "#0bbd87"
    //   this.activities[1].timestamp = dateTime
    //   this.activities[1].color = "#0bbd87"
    //   console.log(dateTime)
    //   let formData = new FormData()
    //   formData.append('token', localStorage.getItem('token'))
    //   formData.append('user_name', input.user_name)
    //   formData.append('user_id', input.user_id)
    //   formData.append('phone_num', input.phone_num)
    //   dateTime = input.visit_time
    //   console.log(dateTime)
    //   let y = dateTime.getFullYear();
    //   let m = dateTime.getMonth() + 1;
    //   m = m < 10 ? ('0' + m) : m;
    //   let d = dateTime.getDate();
    //   d = d < 10 ? ('0' + d) : d;
    //   let h = dateTime.getHours();
    //   h = h < 10 ? ('0' + h) : h;
    //   let minute = dateTime.getMinutes();
    //   minute = minute < 10 ? ('0' + minute) : minute;
    //   let second = dateTime.getSeconds();
    //   second = second < 10 ? ('0' + second) : second;
    //   dateTime = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    //   console.log(dateTime);
    //   this.input.visit_time = dateTime
    //   dateTime = dateTime.replace(/-/g, '-');
    //   let visit_time = new Date(dateTime).getTime()
    //   visit_time /= 1000
    //   formData.append('visit_time', visit_time.toString())
    //   console.log(formData.get('user_name'))
    //   console.log(formData.get('user_id'))
    //   console.log(formData.get('phone_num'))
    //   console.log(formData.get('visit_time'))
    //   this.$axios({
    //     method: 'POST',
    //     url: '/userApply',
    //     data: //{
    //       // 'token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImZmZkBnZy5jb20iLCJleHAiOjc3ODcxNTU4MjAsImVtYWlsIjoiZmZmQGdnLmNvbSJ9.65p8pwWLednWSEQlpGcU8Etvlwlf-nUD7WChWz6n0-I',
    //       // 'user_name' : 'sxcsxc',
    //       // 'user_id' : '220102200010101235',
    //       // 'phone_num' : '18888888888',
    //       // 'visit_time' : '1687585349'
    //       //}
    //       formData
    //   }).then(res => {
    //     if (res.status !== 200 && res.data.success == false) {
    //       this.$message.error('提交失败：' + res.statusText);
    //       return;
    //     } else {
    //       if (res.data.errno == 0) {
    //         this.$message.success('提交成功')
    //         this.activities[2].timestamp = input.visit_time
    //         this.activities[2].color = "#0bbd87"
    //       }
    //       else
    //         this.$message("您已经申请过")
    //       setTimeout(() => {
    //         this.dialogVisible = false;
    //         this.input.user_name = ""
    //         this.input.user_id = ""
    //         this.input.phone_num = ""
    //         this.input.visit_time = ""
    //         this.activities[0].timestamp = ''
    //         this.activities[0].color = ""
    //         this.activities[1].timestamp = ''
    //         this.activities[1].color = ""
    //         this.activities[2].timestamp = ''
    //         this.activities[2].color = ""
    //       }, 3000);
    //     }
    //   })
    // }
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
<style scoped>
.icon {
  top: 5px;
  cursor: pointer;
}

/* .dlg {
  position: absolute;
  z-index: 99999;
} */

.block {
  margin-top: 20px;
}
</style>