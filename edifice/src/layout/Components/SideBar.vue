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
      <el-icon title="维修统计">
        <BrushFilled />
      </el-icon>
      <span class="sideBarFontSize">维修统计</span>
    </el-menu-item>
    <el-menu-item index="/collectGuests" v-show="type === '-1'">
      <el-icon title="访客统计">
        <TrendCharts />
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
      <el-icon title="工作人员">
        <tools />
      </el-icon>
      <span class="sideBarFontSize">工作人员</span>
    </el-menu-item>
  </el-menu>
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