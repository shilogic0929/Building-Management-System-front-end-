<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
      <div class="zz">
        <h2>查看个人租赁信息</h2>
      </div>
    </div>
    <div class="serviceGrid">
      <el-card>
        <template #header>
          <div class = "card-header" style = "margin:0px;">
            <span class="image-font">租赁信息列表</span>
          </div>
        </template>

        <el-table :data="repair.slice((currentPage-1)*10,currentPage*10)" style="width: 100%">
          <el-table-column
              prop="room_id"
              label="房间号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="start_time"
              label="开始时间"
              column-key="start_time"
              width="250">
          </el-table-column>
          <el-table-column
              prop="end_time"
              label="结束时间"
              column-key="end_time"
              width="250">
          </el-table-column>
          <el-table-column
              prop="repair_time"
              label="申请时间"
              column-key="repair_time">
          </el-table-column>

        </el-table>

        <div class="flexItem" style="margin-top:20px;">
          <el-pagination :align='center'
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-size="[10]"
                         layout="total, prev, pager, next, jumper"
                         :total="repair.length"/>
        </div>
      </el-card>
    </div>


  </div>
</template>

<script>
//import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
      img:require("@/assets/image/inner-banner3.jpg"),
      currentPage: 1,
      flow: "",
      visible:false,
      visible2:false,
      rid:"",
      type:1,
      repair:[
        {
          room_id:1,
          start_time: "2023-6-16",
          end_time: "2023-6-17",
          repair_time:"2023-6-15"
        }
      ]
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    init(){
      var that=this;

      const formData=new FormData();
      formData.append('token',localStorage.getItem('token'))
      this.$axios({
        method: 'POST',
        url: '/getLeaseRoom',
        data: formData})
          .then(function (request) {
            console.log(request.data.data);
            that.repair=request.data.data
          })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    filterTag(value, row) {
      return row.status === value;
    },
    lookProcess(index){
      this.visible2=true;
      if(index.status==2)
        this.flow=require("@/assets/flowCharts/finish.jpg")
      else if(index.status==1)
        this.flow=require('@/assets/flowCharts/repairing.jpg')
      else
        this.flow=require('@/assets/flowCharts/apply.jpg')
    }

  }


}
</script>