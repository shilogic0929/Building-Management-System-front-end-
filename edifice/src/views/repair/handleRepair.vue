<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-top: 10px;padding-left: 10px;">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>处理保修</el-breadcrumb-item>
      <el-breadcrumb-item>报修列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs>
      <el-tab-pane style="padding-top: 10px;">
        <FeedbackTable :params="worker_info"></FeedbackTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FeedbackTable from './feedbackTable'
export default {
  name: "admin-feedbacks.vue",
  components: {
    FeedbackTable,
  },
  data() {
    return {
      worker_info: {
        maintainer_id: '',
        maintainer_name: '',
        maintainer_phone: '',
      }
    }
  },
  created() {
    this.worker_info.maintainer_id=this.$route.query.maintainer_id;
    this.worker_info.maintainer_name=this.$route.query.maintainer_name;
    this.worker_info.maintainer_phone=this.$route.query.maintainer_phone;
    console.log(this.worker_info)
  },
}
</script>

<style lang="less" scoped>

</style>