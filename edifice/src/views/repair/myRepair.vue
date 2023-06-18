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

<!--
        <div v-for="(item,index) in repair" :key="index">
          <div class="container">
            <span class="title">报修{{item.wid}}</span>
            <div>
              <el-button type="primary" size="large"  @click="see(index)">查看报修申请</el-button>
              <el-button type="primary" size="large" @click="ensure(index)">报修解决</el-button>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
-->
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
              <el-icon :style="iconStyle">
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
              <el-icon :style="iconStyle">
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
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              信息
            </div>
          </template>
          {{info}}
        </el-descriptions-item>
        <el-descriptions-item align="left">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              初步反馈意见
            </div>
          </template>
          <span>{{advice}}</span>
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
        types: ["水","电","机械","其他"],
        process:["申请中","进行中","已完成"],
        buttonTypes:["info","primary","success"],
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
                status: 2,
                info: "太水了！！",
                adv: "无所谓，我会出手",
                isNew: true
            }
        ]
    }
  },
  mounted() {
      //this.init();
  },
  methods:{
    init(){
      var data={username: this.$store.state.username} 
      var that=this;
      let uid;
      this.$axios.post('/user/lookup_user/',JSON.stringify(data)).then(function (request) {
          console.log(request.data.content);
          uid = request.data.content.uid;
      })
      data={name:"search_workorders"};
      this.repair=[];
      this.$axios.post('/workorder/search_workorders/',JSON.stringify(data)).then(function (request) {
          console.log(request.data.content);
          for(var i=0; i<request.data.content.length; i++){
              if(request.data.content[i].uid==uid&&request.data.content[i].status==2){
                  that.repair.push(request.data.content[i])
              }
              
          }
      })
    },
  
    filterTag(value, row) {
      return row.status === value;
    },
    lookInfo(index){
        this.visible=true;
        this.rid=index.rid;
        this.info=index.info;
        this.type=index.type;
        if(index.adv==="")
          this.advice="暂无";
        else
          this.advice=index.adv;
    },
    /*
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
    */
  }
  

}
</script>