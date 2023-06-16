<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
        <div class="zz">
            <h2>合同信息界面</h2>
        </div>
    </div>

    <div class="desLeft" style="padding-bottom:100px;">
    <el-card >
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;">合同信息</span>
                <el-button type="primary" @click="this.$router.go(-1)">返回</el-button>
            </div>
      </template>

      <el-descriptions :column="1" :size="large" border>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              合同id
            </div>
          </template>
          {{ctid}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              租客id
            </div>
          </template>
          {{uid}}
        </el-descriptions-item>


        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              房间id
            </div>
          </template>
          {{rid}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              开始时间
            </div>
          </template>
          {{startTime}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              租金
            </div>
          </template>
          {{price}}
        </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            出租天数
          </div>
        </template>
        {{period}}
      </el-descriptions-item>


      </el-descriptions>



  </el-card>
  </div>


  <div class="desRight">
    <el-card>
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;font-size:16px;">申请人</span>
            </div>
      </template>
      <div>
        <img class="tx" src="@/assets/image/头像1.jpg">
        <h2>金伟霖</h2>
        <div style="margin-top:5px;">
          <p>邮箱：{{email}}</p>
          <p>电话：{{telephone}}</p>
        </div>
      </div>
    </el-card>

    <!-- <el-card>
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;font-size:16px;">处理报修</span>
            </div>
      </template>
      <el-space>
      <el-select v-model="value" placeholder="请选择师傅">
                <el-option v-for="item in worker" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      <el-button type="primary" @click="goShortRent()">引入师傅</el-button>
      </el-space>
    </el-card> -->

  </div>


  </div>
</template>

<script>


export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner11.jpg"),
        id:0,
        uid:0,
        rid:0,
        ctid:0,
        startTime:"",
        price:0,
        period:0,
        name:"大平层",
        size:500,
        money:9999,
        telephone:18904672108,
        city:"北京",
        address:"No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province",
        email:"1741858932@qq.com",
        worker:[
            {
                id:1,
                name:"张小儿"
            },
            {
                id:2,
                name:"张大孙"
            }
        ]
    }
  },
  mounted() {
    this.ctid=this.$route.params.ctid;
    this.uid=this.$route.params.uid;
    this.rid=this.$route.params.rid;
    this.startTime=this.$route.params.startTime;
    this.price=this.$route.params.price;
    this.period=this.$route.params.period;
  },
  methods:{
    
  }
  

}
</script>

