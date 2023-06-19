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
          </div>
        </template>

        <el-table :data="repair" style="width: 100%">
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
            prop="rid"
            label="房间号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="报修类型"
            width="200">
            <template #default="scope">
              {{types[scope.row.type]}}
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
            :filters="[{ text: '申请中', value: 0 },{ text: '进行中', value: 1 },{ text: '已完成', value: 2 }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            >
            <template #default="scope">
              <el-tag
                :type="buttonTypes[scope.row.status]"
                disable-transitions>{{process[scope.row.status]}}</el-tag>
            </template>
          </el-table-column>
        </el-table>

      </el-card>
    </div>

    
    <el-dialog v-model="visible" title="报修详情">

      <el-descriptions :column="1" border :content-style="{ 'width': '20%' }"
        style="word-break: break-all;word-wrap: break-word;">
        <el-descriptions-item width="100px">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              报修房间编号
            </div>
          </template>
          {{rid}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              报修类型
            </div>
          </template>
          {{type}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              信息
            </div>
          </template>
          {{info}}
        </el-descriptions-item>
        <!-- <el-descriptions-item align="left">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              初步反馈意见
            </div>
          </template>
          <span>{{advice}}</span>
        </el-descriptions-item> -->

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
              <el-icon>
                <user />
              </el-icon>
              维修人联系电话
            </div>
          </template>
          {{phone}}
        </el-descriptions-item>

        <el-descriptions-item v-if="status!=0">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              维修时间
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
    
  </div>
</template>

<script>
//import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner3.jpg"),
        visible:false,
        rid:"",
        type:"",
        info:"",
        advice: "",
        time: "",
        name: "",
        phone: "",
        status: "",
        types: ["水","电","机械","其他"],
        process:["申请中","进行中","已完成"],
        buttonTypes:["info","","success"],
        repair:[
            {
                wid: "1",
                rid:0,
                type: "机械",
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
      
      const formData=new FormData();
      formData.append('token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6IjE1MDcyOTcxNzBAcXEuY29tIiwiZXhwIjo3Nzg3MTc0MDk4LCJlbWFpbCI6IjE1MDcyOTcxNzBAcXEuY29tIn0.xYJiDpLvDatlHAQw8T595wp46qwl6Bw3Gq_qUPKSC2s')
      this.$axios({
        method: 'POST',
        url: '/myRepair',
        data: formData})
        .then(function (request) {
          console.log(request.data.data);
          that.repair=request.data.data
      })
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
    }

  }
  

}
</script>