<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
        <div class="zz">
            <h2>订单审核界面</h2>
        </div>
    </div>
    <div class="serviceGrid">
        <el-card>
            <template #header>
                <div class = "card-header" style = "margin:0px;">
                    <span class="image-font">订单列表</span>
                    <div>
                        <el-button class="button" type="text" @click="this.$router.go(-1)">返回</el-button>
                    </div>
                </div>
            </template>
            <div v-for="(item,index) in order" :key="index">
                <div v-if="item.status==1">
                  <div class="container">
                      <span class="title">订单{{item.oid}}</span>
                      <div>
                          <el-button type="primary" size="large" @click="see(index)">查看</el-button>
                          <el-button type="primary" size="large" @click="pass(index)">审核通过</el-button>
                          <el-button type="primary" size="large" @click="nopass(index)">审核不通过</el-button>
                      </div>
                  </div>
                  <el-divider></el-divider>
                </div>
            </div>
        </el-card>
    </div>

    <el-dialog v-model="visible">
        <el-descriptions :column="1" border>
    
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            用户id
          </div>
        </template>
        {{form.uid}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Wallet />
            </el-icon>
            租金(每月)
          </div>
        </template>
        {{form.price}}元
      </el-descriptions-item>
      
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            房间地址
          </div>
        </template>
        <span>{{form.address}}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            
            起始时间
          </div>
        </template>
        {{form.startTime}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            
              结束时间
          </div>
        </template>
        {{form.endTime}}
      </el-descriptions-item>

      
  </el-descriptions>
    </el-dialog>

  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner7.jpg"),
        visible:false,
        order:[
            {
                name: "订单1",
                id:0,
            },
            {
                name: "订单2",
                id:0,
            }
        ],
        form:"",
    }
  },
  mounted() {
      this.init();
  },
  methods:{
    init(){
      var data={name:"search_orders"};
      var that=this;
      this.$axios.post('/order/search_orders/',JSON.stringify(data)).then(function (request) {
          console.log(request.data.content);
          that.order=request.data.content;
      })

    },
    seeContract(){
       this.$router.push({
          name: '客服查看合同',
          params: {
            
          }
        })
    },
    pass(index){
    
      var data={
        oid:this.order[index].oid,
        res:1,
      };
      this.$axios.post('/order/check_order/',JSON.stringify(data)).then(function (request) {
        console.log(request.data);
          if (request.data.errno==0){
              ElMessage({
                      message: request.data.msg,
                      type: 'success',
                    }) 
          }
          else ElMessage.error(request.data.msg)
      })
    },
    nopass(index){
      var data={
        oid:this.order[index].oid,
        res:0,
      };
      this.$axios.post('/order/check_order/',JSON.stringify(data)).then(function (request) {
          console.log(request.data.content);
          if (request.data.errno==0){
              ElMessage({
                      message: request.data.msg,
                      type: 'success',
                    }) 
          }
          else ElMessage.error(request.data.msg)
      })
    },
    see(index){
      this.visible=true;
      this.form=this.order[index];
      console.log(this.form);
    }
  }
  

}
</script>

