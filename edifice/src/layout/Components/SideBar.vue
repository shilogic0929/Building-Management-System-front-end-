<template>
  <el-menu :collapse="isCollapse" default-active="$route.path" router active-text-color="#0066CC"
           background-color="#FFFFFF" class="el-menu-vertical-demo" text-color="#000000" @open="handleOpen" @close="handleClose">
    <el-menu-item index="/homeview" v-show="type === '-1'">
      <el-icon title="首页">
        <HomeFilled />
      </el-icon>
      <span class="sideBarFontSize">首页</span>
    </el-menu-item>

    <!-- <el-sub-menu>
            <template #title>
              <el-icon><OfficeBuilding /></el-icon>
              <span class="sideBarFontSize">租房系统</span>
            </template>
              <el-menu-item index="/seeHouse">查看房源</el-menu-item>
          </el-sub-menu> -->

    <!-- <el-menu-item index="/checkOrders">
            <el-icon><guide /></el-icon>
            <span class="sideBarFontSize">查看订单</span>
          </el-menu-item> -->

    <el-menu-item index="/clientView" v-show="type === '-1'">
      <el-icon title="客户信息">
        <View />
      </el-icon>
      <span class="sideBarFontSize">客户信息</span>
    </el-menu-item>

    <el-menu-item index="/handleRepair" v-if='type === "-1"'>
      <el-icon title="处理报修">
        <Stamp />
      </el-icon>
      <span class="sideBarFontSize">处理报修</span>
    </el-menu-item>
    <el-menu-item index="/repairReport" v-else-if="type === '0'">
      <el-icon title="用户报修">
        <Tools />
      </el-icon>
      <span class="sideBarFontSize">用户报修</span>
    </el-menu-item>
    <el-menu-item index="/repairService" v-else>
      <el-icon title="维修服务">
        <Brush />
      </el-icon>
      <span class="sideBarFontSize">维修服务</span>
    </el-menu-item>

    <el-menu-item index="/myRepair" v-if="type === '0'">
      <el-icon title="报修记录">
        <Document />
      </el-icon>
      <span class="sideBarFontSize">报修记录</span>
    </el-menu-item>

    <el-menu-item index="/rentIn" v-if="type === '0'">
      <el-icon title="租赁信息">
        <Document />
      </el-icon>
      <span class="sideBarFontSize">租赁信息</span>
    </el-menu-item>

    <el-menu-item index="/roomStatus" v-if="type === '-1'">
      <el-icon title="房间状态">
        <House />
      </el-icon>
      <span class="sideBarFontSize">房间状态</span>
    </el-menu-item>
    <el-menu-item index="/collectWorks" v-show="type === '-1'">
      <el-icon>
        <View />
      </el-icon>
      <span class="sideBarFontSize">维修统计</span>
    </el-menu-item>
    <el-menu-item index="/collectGuests" v-show="type === '-1'">
      <el-icon>
        <View />
      </el-icon>
      <span class="sideBarFontSize">访客统计</span>
    </el-menu-item>

    <el-menu-item index="/knowledgeBase" v-if="type !== '0'">
      <el-icon title="维修知识库">
        <Notebook />
      </el-icon>
      <span class="sideBarFontSize">维修知识库</span>
    </el-menu-item>

    <el-menu-item index="/woIn" v-if="type === '-1'">
      <el-icon>
        <tools />
      </el-icon>
      <span class="sideBarFontSize">工作人员</span>
    </el-menu-item>
    <el-menu-item index="/visitor" v-if="type === '0'">
      <el-icon><Message /></el-icon>
      <span class="sideBarFontSize" @click="dialogVisible = true">访客申请</span>
    </el-menu-item>
  </el-menu>
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
                <el-date-picker v-model="input.visit_time" type="datetime" placeholder="选择日期和时间" value-format="YYYY-MM-DD HH:mm:ss"/>
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
      </el-dialog>
</template>

<script>

export default {
  data() {
    return {
      isCollapse: false,
      type: '',
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
  computed: {
    monitor() {
      return this.$store.state.isCollapsed;
    }
  },
  watch: {
    monitor() {
      this.isCollapse = this.$store.state.isCollapsed;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
      this.activities[0].timestamp = dateTime
      this.activities[0].color = "#0bbd87"
      this.activities[1].timestamp = dateTime
      this.activities[1].color = "#0bbd87"
      let formData = new FormData()
      formData.append('token', localStorage.getItem('token'))
      formData.append('user_name', input.user_name)
      formData.append('user_id', input.user_id)
      formData.append('phone_num', input.phone_num)
      formData.append('visit_time', timestamp)
      this.$axios({
        method: 'POST',
        url: '/userApply',
        data: //{
          // 'token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImZmZkBnZy5jb20iLCJleHAiOjc3ODcxNTU4MjAsImVtYWlsIjoiZmZmQGdnLmNvbSJ9.65p8pwWLednWSEQlpGcU8Etvlwlf-nUD7WChWz6n0-I',
          // 'user_name' : 'sxcsxc',
          // 'user_id' : '220102200010101235',
          // 'phone_num' : '18888888888',
          // 'visit_time' : '1687585349'
          //}
          formData
      }).then(res => {
        if (res.status !== 200 && res.data.success == false) {
          this.$message.error('提交失败：' + res.statusText);
          return;
        } else {
          if (res.data.errno == 0) {
            this.$message.success('提交成功')
            this.activities[2].timestamp = input.visit_time
            this.activities[2].color = "#0bbd87"
          }
          else
            this.$message("您已经申请过")
          setTimeout(() => {
            this.dialogVisible = false;
          }, 1000);
        }
      })
    }
  },
  created() {
    this.type = localStorage.getItem('type')
    console.log()
  }
}
</script>
<style>
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.el-submenu.is-active {
  width: 150px;
}
</style>