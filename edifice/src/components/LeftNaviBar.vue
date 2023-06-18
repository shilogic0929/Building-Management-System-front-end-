<template>
  <div class="flexItem" :class="[isCollapse? 'colswitch':'norswitch']">
    <div v-show="!isCollapse" style="white-space: nowrap;">致真大厦管理系统</div>
    <span class="collapseButton flexItem" @click="this.isCollapse=!this.isCollapse;">
      <el-icon v-if="!isCollapse"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </span>
  </div>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><Menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'HomeView',
    data() {
      return {
        isCollapse: false
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
.norswitch {
  width: 200px;
  cursor: pointer;
  height: 40px;
  transition: width 0.7s ease;
}
.colswitch {
  width: 25px;
  cursor: pointer;
  height: 40px;
  transition: width 0.5s ease;
}
.collapseButton {
  position: relative;
  left: 20px;
  font-size: 22px;
}
.el-menu-vertical-demo {
  min-height: 650px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
