<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
      <div class="zz">
        <h2>工人接单</h2>
      </div>
    </div>
    <div class="serviceGrid">
      <el-card>
        <template #header>
          <div class = "card-header" style = "margin:0px;">
            <span class="image-font">报修申请列表</span>
            <div v-if="!isfinished" >
              <el-button class="button" type="text" @click="this.isfinished=true">查看已完成报修</el-button>
            </div>
            <div v-else>
              <el-button class="button" type="text" @click="this.isfinished=false">返回</el-button>
            </div>
          </div>
        </template>
        
        <el-table v-if="!isfinished" :data="table1" style="width: 100%">
          <el-table-column
            label="序号"
            width="180">
            <template #default="scope">
              <span class="red" v-if="scope.row.isNew"></span>
              <a @click="lookInfo(scope.row)" style="cursor: pointer;">
                  {{scope.row.wid}}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="reportTime"
            label="申请时间"
            sortable
            column-key="reportTime">
          </el-table-column>
          <el-table-column
            prop="status"
            label="报修状态"
            width="150">
            <template #default="scope">
              <el-tag
                :type="buttonTypes[scope.row.status]"
                disable-transitions>{{process[scope.row.status]}}</el-tag>
            </template>
          </el-table-column>
        </el-table>

        <el-table v-else :data="table2" style="width: 100%">
          <el-table-column
            label="序号"
            width="180">
            <template #default="scope">
              <span class="red" v-if="scope.row.isNew"></span>
              <a @click="lookInfo(scope.row)" style="cursor: pointer;">
                  {{scope.row.wid}}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="reportTime"
            label="申请时间"
            sortable
            column-key="reportTime">
          </el-table-column>
          <el-table-column
            prop="status"
            label="报修状态"
            width="150">
            <el-tag
              type="success"
              disable-transitions>已完成</el-tag>
          </el-table-column>
        </el-table>

      </el-card>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner3.jpg"),
        isfinished: false,
        rid:"",
        type:"",
        info:"",
        uid: "",
        process:["未处理","进行中"],
        buttonTypes:["info","warning"],
        table1: [],
        table2: [],
        repair:[
            {
                wid: "1",
                rid:0,
                type: "机械",
                reportTime: "2023-6-16",
                status: 0,
                info: "隔墙有眼",
                adv: "",
                isNew: false
            },
            {
                wid: "2",
                rid:0,
                type: "水",
                reportTime: "2023-6-11",
                status: 1,
                info: "太水了！！",
                adv: "无所谓，我会出手",
                isNew: true
            },
            {
                wid: "33",
                rid:3113,
                type: "电",
                reportTime: "2023-6-20",
                status: 2,
                info: "功率不够！",
                adv: "Okok",
                isNew: false
            }
        ]
    }
  },
  mounted() {
      //this.init();
      for(let i=0;i<this.repair.length;i++)
      {
        if(this.repair[i].status==2)
          this.table2.push(this.repair[i])
        else
          this.table1.push(this.repair[i])
      }
  },
  methods:{
    init(){
        
      var data={username: this.$store.state.username} 
      var that=this;
      this.$axios.post('/user/lookup_user/',JSON.stringify(data)).then(function (request) {
          console.log(request.data.content);
          that.uid = request.data.content.uid;
      })
      data={name:"search_workorders"};
      this.repair=[];
      this.$axios.post('/workorder/search_workorders/',JSON.stringify(data)).then(function (request) {
          console.log(request.data.content);
          for(var i=0; i<request.data.content.length; i++){
              if(request.data.content[i].worker==this.uid&&request.data.content[i].status==2){
                  that.repair.push(request.data.content[i])
              }
          }
      })
    },
    lookInfo(index){
      this.$router.push({
        name: '报修内容界面',
        params: {
            uid:this.uid,
            rid:index.rid,
            wid:index.wid,
        }
      })
    },
    ensure(index){
      var data={wid: this.repair[index].wid} 
      this.$axios.post('/workorder/ensure_workorder/',JSON.stringify(data)).then(function (request) {
          console.log(request.data);
          if(request.data.errno==0){
                    ElMessage({
                      message: request.data.msg,
                      type: 'success',
                    }) 
            }
            else{
                ElMessage.error(request.data.msg)
            }
      })
    }
  }
  

}
</script>

