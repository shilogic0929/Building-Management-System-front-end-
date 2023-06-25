<template>
  <div>
    <el-card>

      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="160px"></el-table-column>
        <el-table-column prop="tel" label="电话" width="250px"></el-table-column>
        <el-table-column prop="job" label="岗位" width="140px"></el-table-column>
        <el-table-column prop="category" label="维修类型" width="180px">
          <template v-slot="scope">{{ scope.row.category == '-1' ? '管理人员' : '维修人员' }}</template>

        </el-table-column>
        <el-table-column prop="isMaintainer" label="可用状态" width="300px">


          <template v-slot="scope">

            <!--            <el-button size="mini" type="primary"  icon="el-icon-edit" @click="edit(scope.row)">state</el-button>-->
            <el-button size="mini" type="warning" icon="el-icon-delete" @click="removeById(scope.row)">
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
    </el-card>

  </div>
</template>

<script>
// import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      tableData: [
        {
          tel: '15456547896',
          name: '管宁',
          job: '高级工人',
          category: '水电工',
          isMaintainer: true,
        },
        // {
        //   phone: '16587452687',
        //   name: '许邵',
        //   job:'低级工人',
        //   type:'木工',
        //   if_use: '可用'
        // }, {
        //   phone: '18659324785',
        //   name: '杨彪',
        //   job:'中级工人',
        //   type:'装修工',
        //   if_use: '可用'
        // }, {
        //   phone: '18596957458',
        //   name: '刘焉',
        //   job:'低级工人',
        //   type:'清洁工',
        //   if_use: '可用'
        // }


      ],
      total: 10
    };
  },
  // created() {
  //   this.getGoodsList();
  // },

  mounted() {
    this.init();
    console.log(this.total)
  },
  methods: {
    init() {


      var naid = localStorage.getItem("token");
      console.log(naid)

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
        console.log(res.data.errno)
        if (res.data.errno === 0) {
          // this.tableData=JSON.parse(res.data.data)
          this.tableData = res.data.data


        }
      })


    },

    edit(row) {

      if (row.isMaintainer === false) {
        alert('不为维修人员！');
      }
      else {
        alert('可以维修！');
      }
    },
    removeById(row) {

      if (row.isMaintainer === false) {

        alert('不是维修人员！');
      }
      else {

        alert('成功派遣！');
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
    },


  }
};

</script>

<style lang="less" scoped></style>