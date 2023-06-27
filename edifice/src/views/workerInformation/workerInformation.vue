<template>
  <div class="page">
    <el-card style="margin-top: 30px;">
      <h1 class="image-font" style="font-size:30px; margin: 10px auto 30px">工作人员信息</h1>

      <el-table :data="show_tableData" stripe border style="width: 100%;" ref="workerTable">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="160px"></el-table-column>
        <el-table-column prop="tel" label="电话" width="250px"></el-table-column>
        <el-table-column prop="job" label="岗位" width="180px"></el-table-column>
        <el-table-column prop="category" label="维修类型" width="180px">
          <template v-slot="scope">{{ scope.row.category == '-1' ? '管理人员' : '维修人员' }}</template>

        </el-table-column>
        <el-table-column prop="isMaintainer" label="可用状态" >


          <template v-slot="scope">

            <!--            <el-button size="mini" type="primary"  icon="el-icon-edit" @click="edit(scope.row)">state</el-button>-->
            <el-button size="small" type="warning" icon="el-icon-delete" @click="removeById(scope.row)">
              {{ scope.row.category == '-1' ? '不可维修' : scope.row.isMaintainer == true ? '空闲当中' : '正接单中' }}

            </el-button>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="worker_id" label="" width="0px"></el-table-column>-->
      </el-table>

      <!-- <div class="main_container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum" :page-sizes="[10, 20, 50]" :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper" :total="total" background>
        </el-pagination>
      </div> -->
      <el-space>
        <div class="title">
          <el-pagination layout="prev, pager, next" :total="this.tableData.length" hide-on-single-page="true"
            @current-change="changePage" :current-page="currentPage" />
        </div>
      </el-space>
    </el-card>

  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      fromPath: "",
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      tableData: [],
      show_tableData: [],
      total: 10,
      currentPage: 1,
    };
  },
  mounted() {
    this.init();
    console.log(this.total)
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例,将值传入fromPath
      vm.fromPath = from.path;
      console.log(to)
      console.log(from)
    });
  },
  methods: {
    init() {
      var naid = localStorage.getItem("token");
      // console.log(naid)
      const formData = new FormData()
      formData.append('page', this.queryInfo.pagenum)
      formData.append('numInOnePage', this.queryInfo.pagesize)
      formData.append('token', naid)
      this.$axios({
        method: 'POST',
        url: '/getWorker',
        data: formData
      }).then(res => {
        console.log(res.data)
        // console.log(res.data.errno)
        if (res.data.errno === 0) {
          this.tableData = res.data.data
          if (this.tableData.length > 10) {
            this.show_tableData = this.tableData.slice(0, 10)
          } else {
            this.show_tableData = this.tableData
          }
        }
      })

    },


    handleCurrentChange(val) {
      this.currentPage = val;
    },
    edit(row) {

      if (row.isMaintainer === false) {
        ElMessage({
                  message: "不为维修人员！",
                  type: 'error',
                })
      }
      else {
        ElMessage({
                  message: "可以维修！",
                  type: 'success',
                })
      }
    },
    removeById(row) {
      if (row.isMaintainer === false) {
        ElMessage({
                  message: "不是维修人员！",
                  type: 'error',
                })
      }
      else {
        if (this.fromPath === '/handleRepair') {

          ElMessage({
                  message: "成功派遣！",
                  type: 'success',
                })
          this.$router.push({
            path: '/handleRepair',
            //name: '处理报修界面',
            query: {
              //form_id:this.row.worker_id,
              maintainer_name: row.name,
              maintainer_id: row.user_id,
              maintainer_phone: row.tel,
            }
          })
        }
        else {
          ElMessage({
                  message: "可以维修！",
                  type: 'success',
                })
        }
      }
    },
    changePage(val) {
      console.log(val)
      this.currentPage = val
      let start_index = (val - 1) * 10
      let end_index = start_index + 10
      this.show_tableData = this.tableData.slice(start_index, end_index)
    },
  },
  watch: {

  }
};

</script>

<style scoped>
.page {
  z-index: -1;
}
</style>