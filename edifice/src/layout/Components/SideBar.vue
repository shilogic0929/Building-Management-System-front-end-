<template>
  <el-menu :collapse="isCollapse" default-active="$route.path" router active-text-color="#0066CC"
           background-color="#FFFFFF" class="el-menu-vertical-demo" text-color="#000000" @open="handleOpen" @close="handleClose">
    <el-menu-item index="/homeview">
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
        <BrushFilled />
      </el-icon>
      <span class="sideBarFontSize">维修统计</span>
    </el-menu-item>
    <el-menu-item index="/collectGuests" v-show="type === '-1'">
      <el-icon>
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
      <el-icon>
        <tools />
      </el-icon>
      <span class="sideBarFontSize">维修人员</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      type: '',
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
    console.log(this.type)
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