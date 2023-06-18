<template>
  <el-menu :collapse="isCollapse" default-active="$route.path" router active-text-color="#009966"
    background-color="#FFFFFF" class="el-menu-vertical-demo" text-color="#000000" @open="handleOpen" @close="handleClose">
    <el-menu-item index="/dashboard">
      <el-icon>
        <house />
      </el-icon>
      <span class="sideBarFontSize">首页</span>
    </el-menu-item>
    <el-sub-menu>
      <template #title>
        <el-icon>
          <OfficeBuilding />
        </el-icon>
        <span class="sideBarFontSize">租房系统</span>
      </template>

      <el-menu-item index="/seeHouse">查看房源</el-menu-item>

    </el-sub-menu>
    <el-menu-item index="/checkOrders">
      <el-icon>
        <guide />
      </el-icon>
      <span class="sideBarFontSize">查看订单</span>
    </el-menu-item>
    <el-menu-item index="/seeContract">
      <el-icon>
        <View />
      </el-icon>
      <span class="sideBarFontSize">查看合同界面</span>
    </el-menu-item>
    <el-menu-item index="/appraise">
      <el-icon>
        <ChatLineRound />
      </el-icon>
      <span class="sideBarFontSize">评价系统</span>
    </el-menu-item>
    <el-menu-item index="/repair">
      <el-icon>
        <Brush />
      </el-icon>
      <span class="sideBarFontSize">工单报修系统</span>
    </el-menu-item>
    <el-menu-item index="/workers" v-if="this.$store.state.isWorker">
      <el-icon>
        <Promotion />
      </el-icon>
      <span class="sideBarFontSize">工人系统</span>
    </el-menu-item>
    <el-menu-item index="/serviceHome" v-if="this.$store.state.isService">
      <el-icon>
        <Service />
      </el-icon>
      <span class="sideBarFontSize">客服系统</span>
    </el-menu-item>
    <el-menu-item index="/roomStatus">
      <el-icon>
        <House />
      </el-icon>
      <span class="sideBarFontSize">房间状态</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
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

}
</script>
