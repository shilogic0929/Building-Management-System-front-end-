<template>
  <div id="app">
<<<<<<< HEAD
    <el-config-provider :locale="zhCn">
      <router-view/>
    </el-config-provider>
=======
    <router-view />
>>>>>>> master
  </div>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
</script>


<script>

export default {
  mounted() {
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() {
      var data = {
        isService: this.$store.state.isService,
        isWorker: this.$store.state.isWorker,
        username: this.$store.state.username,
      }
      sessionStorage.setItem("state", JSON.stringify(data));
    }
  },
}
</script>


<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.flexItem {
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  text-decoration: none;
}

.el-empty {
  margin-top: 130px;
}

.el-dialog {
  border-radius: 8px !important;
}

.el-dialog__header {
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}

ul {
  padding-inline-start: 0 !important;
  list-style-type: none;
}

hr {
  border: none;
  height: 1px;
  background-color: rgb(220, 223, 230);
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(167, 159, 159);
  border-radius: 32px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 32px;
}
</style>







