<template class="Orders">

  <a v-if="detail<0">
    <div class="bgImage">
      <a v-for="i in 6" v-bind:key="i">
        <a v-if="(curPage-1)*4+i-1<numOrders ">
          <div v-if="check==true" class="divisionBox">
            <div class="orderId">
              <b cl ass="orderFont">订单编号：</b>
              <b class="orderFont">{{ form[(curPage-1)*4+i-1].oid }}</b>
            </div>
            <div class="orderTime">
              <b class="orderFont">订单时间：</b>
              <b class="orderFont">{{ form[(curPage-1)*4+i-1].startTime }}</b>
            </div>
            <div class="price">
              <b class="orderFont">订单价格： </b>
              <b style="color: red;">{{ form[(curPage-1)*4+i-1].price }}￥</b>
            </div>
            <el-link type="primary" class="details"
                     v-on:click="this.showDetails((curPage-1)*4+i-1)">查看详情</el-link>
            <a v-if="form[(curPage-1)*4+i-1].status==1">
              <div class="stat red">未审核</div>
            </a>
            <a v-if="form[(curPage-1)*4+i-1].status==2">
              <div class="stat red">未付款</div>
            </a>
            <a v-if="form[(curPage-1)*4+i-1].status==3">
              <div class="stat blue">已付款</div>
            </a>
            <a v-if="form[(curPage-1)*4+i-1].status==4">
              <div class="stat red">已到期</div>
            </a>
          </div>
        </a>
        <a v-else>
          <div class="divisionNull"></div>
        </a>
      </a>
      <div class="orderPages">
        <el-pagination background layout="prev, pager, next"
                       :page-count="10"
                       @current-change="changeCurPage"/>
      </div>
    </div>
  </a>

  <!--
  订单详情页，展示订单详细信息
  可以返回订单列表，删除订单以及续订
  -->
  <a v-else class="Details">
    <el-descriptions
        class="margin-top"
        title="订单详情页"
        :column="1"
        border
    >
      <template #extra>
        <el-button type="primary" class="returnButton" @click="returnToList">
          返回订单列表
        </el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><iphone /></el-icon>
            <a>订单号</a>
          </div>
        </template>
        {{form[detail].oid}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><flag /></el-icon>
            <a>房源地址</a>
          </div>
        </template>
        {{ form[detail].address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><flag /></el-icon>
            <a>租房类型</a>
          </div>
        </template>
        {{form[detail].rent}}人间
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><clock /></el-icon>
            <a>订单建立时间</a>
          </div>
        </template>
        {{form[detail].startTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><clock /></el-icon>
            <a>结束日期</a>
          </div>
        </template>
        {{form[detail].endTime + " 12:00:00"}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><shop /></el-icon>
            <a>租金金额</a>
          </div>
        </template>
        {{form[detail].price}} ￥
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><shop /></el-icon>
            <a>备注</a>
          </div>
        </template>
        {{form[detail].desc}}
      </el-descriptions-item>

    </el-descriptions>
    <div>
      <el-date-picker v-model="dateSelect"
                      v-if="form[detail].rent=='2'"
                      value-format="YYYY-M-D"
                      type="month"
                      placeholder="续订到哪一天"
                      class="dateSelect"/>
      <el-button type="primary" class="dueButton"
                 v-if="form[detail].rent=='2'"
                 @click="newOrders(detail)">续订
      </el-button>
    </div>
    <div>
      <el-button type="primary" class="guaranteeButton"
                 v-if="form[detail].status==2"
                 v-on:click="guarantee(detail)">确认并支付
      </el-button>
      <el-button type="primary" class="delButton" 
                 @click="deleteOrders(detail)">删除订单
      </el-button>
    </div>
  </a>

</template>

<script>

import { Clock, Flag, Iphone, Shop} from "@element-plus/icons-vue";

export default {
  components: {Flag, Shop, Clock,  Iphone},
  data() {
    return {
      form:[
        {
          id:1,
          price: 252,
          startTime:"2022-03-26",
          endTime:"2022-04-26",
          status:1,
          house:'翻斗花园',
          renter:"wzy",
          rent:"1",
          rid: "",
          period:"",
          desc: "",
        }
      ],
      check:false,
      //为零则跳转到对应的订单的详情页
      detail : -1,
      //当前页面的页码
      curPage : 1,
      //总订单数
      numOrders : 1,
      //续订的目标日期
      dateSelect : ""
    };
  },
  mounted() {
    this.init();
  },
  watch : {
  },
  methods: {
    init(){
      var data={name:"search_orders"};
      var that=this;
      console.log(data);
      this.$axios.post('/order/search_orders/',JSON.stringify(data)).then(function (request) {
          console.log(request.data)
          that.form=request.data.content;
          that.numOrders=that.form.length;
          console.log(that.form)
          that.check=true;
      })

    },
    changeCurPage (newVal){
      this.curPage = newVal;
    },
    guarantee(i){
      this.$router.push({
          name: '缴费',
          params: {
                oid:this.form[i].oid,
                rid:this.form[i].rid,
            }
      })
    },
    showDetails: function (i) {
      this.detail = i;
    },
    returnToList: function () {
      this.detail = -1;
    },
    deleteOrders: function (i) {
      var data={oid:this.form[i].oid}
      var that=this;
      this.$axios.post('/order/delete_order/',JSON.stringify(data)).then(function (request) {
        var content=request.data.content;
        console.log(content)
        if(request.data.errno==0){
          alert("删除订单成功");
          that.form.splice(i,1);
        }
        else{
          alert("删除失败")
        }
      })

      this.numOrders --;
      this.detail = -1;
    },
    newOrders : function (i) {
      if(this.dateSelect==""){
        alert("请选择正确的时间");
        return ;
      }
      var bb=this.form[i].startTime.split('-')
      var aa=this.dateSelect.split('-')
      var a=[],b=[];
      for(var j=0;j<bb.length;j++){
        a[j]=parseInt(aa[j]);
        b[j]=parseInt(bb[j]);
      }
      if(aa==""||a[0]<b[0]||(a[0]==b[0])&&(a[1]<=b[1])){
        alert("请选择正确的时间");
        return ;
      }
      var data={
        username:this.$store.state.username,
        rid : this.form[i].rid,
        rent : this.form[i].rent,
        price : this.form[i].price,
        startTime : this.form[i].endTime,
        endTime : this.dateSelect,
        period : this.form[i].period,
        type : this.form[i].type
      }
      this.form.push(data);
      this.numOrders++;
      alert("续订成功");

      // var that=this;
      this.$axios.post('/order/create_order/',JSON.stringify(data)).then(function (request) {
        var content=request.data.content;
        console.log(content)
      })

      this.returnToList();
    }
  }
};
</script>
