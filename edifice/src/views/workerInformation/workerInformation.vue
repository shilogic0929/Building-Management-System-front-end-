<template>
  <div>
<!--    <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>商品管理</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>商品列表</el-breadcrumb-item>-->
<!--    </el-breadcrumb>-->

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
              placeholder="请输入内容"
              clearable
              v-model="queryInfo.query"
              @clear="getGoodsList"
          >
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="handleCurrentChange(1)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加人员信息</el-button>
        </el-col>
      </el-row>

      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="160px"></el-table-column>
        <el-table-column prop="phone" label="电话" width="250px"></el-table-column>
        <el-table-column prop="job" label="岗位" width="140px"></el-table-column>
        <el-table-column prop="type" label="维修类型" width="180px">
<!--          <template v-slot="scope">-->
<!--            {{ scope.row.add_time | dateFormat }}-->
<!--          </template>-->
        </el-table-column>
        <el-table-column prop="if_use" label="可用状态" width="300px">
          <template v-slot="scope">
            <el-button size="mini" type="primary"  icon="el-icon-edit" @click="edit(scope.row)">state</el-button>
            <el-button size="mini" type="warning" icon="el-icon-delete" @click="removeById(scope.row)">change</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[10, 20, 50]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      tableData: [{
        phone: '15456547896',
        name: '管宁',
        job:'高级工人',
        type:'水电工',
        if_use: '可用'
      }, {
        phone: '16587452687',
        name: '许邵',
        job:'低级工人',
        type:'木工',
        if_use: '可用'
      }, {
        phone: '18659324785',
        name: '杨彪',
        job:'中级工人',
        type:'装修工',
        if_use: '可用'
      }, {
        phone: '18596957458',
        name: '刘焉',
        job:'低级工人',
        type:'清洁工',
        if_use: '可用'
      }

      ],
      total: 10
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    addRow () {
      var list = {
        rowNum: '',
        name: this.name,
        phone: this.phone,
        job: this.job,
        type: this.type,
        if_use: this.if_use}
      this.tableData.unshift(list)
    },
    async getGoodsList() {
      // const { data } = await this.$http.get("goods", {
      //   params: this.queryInfo
      // });
      // if (data.meta.status !== 200) {
      //   return this.$message.error(data.meta.msg);
      // }
      // this.goodslist = data.data.goods;
      // this.total = data.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    // eslint-disable-next-line no-unused-vars
    edit(row){
      alert(row.if_use);
    },
    removeById(row) {
      if (row.if_use == '可用'){
        row.if_use = '不可用';
        alert('派遣成功');
      }
      else {
        row.if_use = '可用';
        alert('已完成派遣');
      }
    },
    goAddPage() {
      this.$router.push("goods/add");
    }
  }
};
</script>

<style lang="less" scoped></style>
