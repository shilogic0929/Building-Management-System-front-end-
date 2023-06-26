<template>
  <div style="height:100%;overflow:hidden;margin:0px">
    <el-header>
      <m-Header></m-Header>
    </el-header>
    <el-container>
      <side-Bar></side-Bar>
      <el-main>
        <main-page></main-page>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SideBar from "./Components/SideBar.vue";
import MHeader from "./Components/MHeader.vue";
import MainPage from "./Components/MainPage.vue";
export default {
  methods: {

  },
  components: {
    SideBar,
    MHeader,
    MainPage,
  }
}
</script>

<style scoped>
.el-main{
  flex-basis: 3px;
}

.el-header {
  position: sticky;
  top: 0%;
  z-index: 1;
}
</style>
