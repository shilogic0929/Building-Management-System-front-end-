<template> 
        <div>
            <el-card>
                 <template #header>
                    <div class = "card-header" style="margin-bottom:0px;">
                        <span class="image-font" style="font-size:20px;">客户信息</span>
                        <div>
                        <el-button type="text" @click="visible=true">增删改查</el-button>
                        </div>
                    </div>
                </template>
            <div class="ato-list">
                <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template v-slot="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
          <el-form-item label="物业费缴纳信息">
            <el-popover placement="right" :width="400" trigger="click">
                <template #reference>
                    <el-button style="margin-right: 16px">查看详情</el-button>
                </template>
                <el-table :data="gridData">
                    <el-table-column width="150" property="date" label="年份" />
                    <el-table-column width="100" property="name" label="缴纳时间" />
                    </el-table>
            </el-popover>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="desc">
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
            </div>

            <div></div>
            <el-space>
                <div class="title">
                    <el-pagination :model="contract" background layout="prev, pager, next" :total="100" @current-change="changeCurPage"/>
                </div>
            </el-space>

            </el-card>

            <el-dialog v-model="visible" title="上传合同" width="50%">
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽到这里 <em>或者点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                    只能上传pdf版合同
                    </div>
                </template>
                </el-upload>
                <span slot="footer" >
                    <el-button type="primary" @click="onSubmit()">确定</el-button>
                    <el-button @click="visible = false">取消</el-button>
                </span>
            </el-dialog>
        </div>
            
</template>

<script>
import { ref } from 'vue'
export default {
  data(){
        return {
        dialogTableVisible : ref(false),
        visible:false,
        bscroll:null,
        curPage:1,
        numOrders:6,
        contract: [],
        ///////
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
                }],
          gridData : [
            {
                date: '2016-05-02',
                name: 'John Smith',
                address: 'No.1518,  Jinshajiang Road, Putuo District',
            },
            {
                date: '2016-05-04',
                name: 'John Smith',
                address: 'No.1518,  Jinshajiang Road, Putuo District',
            },
            {
                date: '2016-05-01',
                name: 'John Smith',
                address: 'No.1518,  Jinshajiang Road, Putuo District',
            },
            {
                date: '2016-05-03',
                name: 'John Smith',
                address: 'No.1518,  Jinshajiang Road, Putuo District',
            },
            ]
    }
  },
  mounted() {
  },
    methods: {
  }
}
</script>
<style>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>