<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
      <div class="zz">
        <h2>查看个人报修申请</h2>
      </div>
    </div>
    <div class="serviceGrid">
      <el-card>
        <template #header>
          <div class = "card-header" style = "margin:0px;">
            <span class="image-font">报修申请列表</span>
            <div v-if="!isLookFinish">
              <el-button class="button" type="text" @click="this.isLookFinish = true">查看已完成报修</el-button>
            </div>
            <div v-else>
              <el-button class="button" type="text" @click="this.isLookFinish = false">返回</el-button>
            </div>
          </div>
        </template>

        <el-table :data="repair1.slice((currentPage1-1)*10,currentPage1*10)" style="width: 100%" v-if="!isLookFinish">
          <el-table-column
            label="序号"
            width="180">
            <template #default="scope">
              <span class="red" v-if="scope.row.status==1"></span>
              <a @click="lookInfo(scope.row)" style="cursor: pointer;">
                  {{scope.row.wid}}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="rid"
            label="房间号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="报修类型"
            width="200">
            <template #default="scope">
              {{types[scope.row.type-1]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="repair_time"
            label="申请时间"
            sortable
            column-key="repair_time">
          </el-table-column>
          <el-table-column
            prop="status"
            label="报修状态"
            width="150"
            >
            <template #default="scope">
              <el-tag @click="lookProcess(scope.row)" style="cursor: pointer;"
                :type="buttonTypes[scope.row.status]"
                disable-transitions>{{process[scope.row.status]}}</el-tag>
            </template>
          </el-table-column>
        </el-table>

        <el-table :data="repair2.slice((currentPage2-1)*10,currentPage2*10)" style="width: 100%" v-else>
          <el-table-column
            label="序号"
            width="180">
            <template #default="scope">
              <a @click="lookInfo(scope.row)" style="cursor: pointer;">
                  {{scope.row.wid}}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="rid"
            label="房间号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="报修类型"
            width="200">
            <template #default="scope">
              {{types[scope.row.type-1]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="repair_time"
            label="申请时间"
            sortable
            column-key="repair_time">
          </el-table-column>
          <el-table-column
            prop="status"
            label="报修状态"
            width="150"
            >
            <template #default="scope">
              <el-tag @click="lookProcess(scope.row)" style="cursor: pointer;"
                :type="buttonTypes[scope.row.status]"
                disable-transitions>{{process[scope.row.status]}}</el-tag>
            </template>
          </el-table-column>
        </el-table>

        <div class="flexItem" style="margin-top:20px;" v-if="!isLookFinish">
          <el-pagination :align='center' 
            @current-change="handleCurrentChange1"
            :current-page="currentPage1" 
            :page-size="[10]"
            layout="total, prev, pager, next, jumper" 
            :total="repair1.length"/>
        </div>

        <div class="flexItem" style="margin-top:20px;" v-else>
          <el-pagination :align='center' 
            @current-change="handleCurrentChange2"
            :current-page="currentPage2" 
            :page-size="[10]"
            layout="total, prev, pager, next, jumper" 
            :total="repair2.length"/>
        </div>

      </el-card>
    </div>

    
    <el-dialog v-model="visible" title="报修详情">

      <el-descriptions :column="1" border :content-style="{ 'width': '20%' }"
        style="word-break: break-all;word-wrap: break-word;">
        <el-descriptions-item width="100px">
          <template #label>
            <div class="cell-item">
              <el-icon><Discount /></el-icon>
              &nbsp;报修房间号
            </div>
          </template>
          {{rid}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><Setting /></el-icon>
              &nbsp;报修类型
            </div>
          </template>
          {{types[type-1]}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><Tickets /></el-icon>
              &nbsp;问题描述
            </div>
          </template>
          {{info}}
        </el-descriptions-item>

        <el-descriptions-item v-if="status!=0">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              维修人
            </div>
          </template>
          {{name}}
        </el-descriptions-item>

        <el-descriptions-item v-if="status!=0">
          <template #label>
            <div class="cell-item">
              <el-icon><Iphone /></el-icon>
              &nbsp;维修人联系电话
            </div>
          </template>
          {{phone}}
        </el-descriptions-item>

        <el-descriptions-item v-if="status!=0">
          <template #label>
            <div class="cell-item">
              <el-icon><Timer /></el-icon>
              &nbsp;维修时间
            </div>
          </template>
          {{time}}
        </el-descriptions-item>

      </el-descriptions>
      <template #footer>
          <span class="dialog-footer">
              <el-button type="primary" @click="visible = false">确认</el-button>
          </span>
      </template>

    </el-dialog>
    
    <el-dialog v-model="visible2" title="报修进度">
      <img :src="flow" style="width: 550px;height: 550px;">
    </el-dialog>
  </div>
</template>

<script>
//import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner3.jpg"),
        currentPage1: 1,
        currentPage2: 1,
        flow: "",
        visible:false,
        visible2:false,
        isLookFinish: false,
        rid:"",
        type:1,
        info:"",
        advice: "",
        time: "",
        name: "",
        phone: "",
        status: "",
        types: ["水","电","机械","其他"],
        process:["申请中","进行中","已完成"],
        buttonTypes:["info","","success"],
        getRepair: [],
        repair:[
            {
                wid: "1",
                rid:0,
                type: 1,
                repair_time: "2023-6-16",
                status: 0,
                description: "隔墙有眼",
                maintain_time: "",
                maintainer_name: "",
                maintainer_phone: "",
                isNew: false
            }
        ],
        repair1: [
          {
            wid: "1",
            rid:0,
            type: 1,
            repair_time: "2023-6-16",
            status: 0,
            description: "隔墙有眼",
            maintain_time: "",
            maintainer_name: "",
            maintainer_phone: "",
            isNew: false
          }
        ],
        repair2: [
          {
            wid: "1",
            rid:0,
            type: 1,
            repair_time: "2023-6-16",
            status: 0,
            description: "隔墙有眼",
            maintain_time: "",
            maintainer_name: "",
            maintainer_phone: "",
            isNew: false
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
      that.repair=[];
      that.repair1=[];
      that.repair2=[];
      const formData=new FormData();
      formData.append('token',localStorage.getItem('token'))
      this.$axios({
        method: 'POST',
        url: '/myRepair',
        data: formData})
        .then(function (request) {
          console.log(request.data.data);
          that.repair=request.data.data
          for(var i=0;i<that.repair.length;i++)
          {
            if(that.repair[i].status==2)
              that.repair2.push(that.repair[i])
            else
              that.repair1.push(that.repair[i])
          }
      })
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
    },
    filterTag(value, row) {
      return row.status === value;
    },
    lookInfo(index){
      this.visible=true;
      this.rid=index.rid;
      this.info=index.description;
      this.type=index.type;
      this.time=index.maintain_time;
      this.name=index.maintainer_name;
      this.phone=index.maintainer_phone;
      this.status=index.status
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