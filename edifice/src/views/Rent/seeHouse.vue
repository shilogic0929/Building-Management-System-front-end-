/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="divpadding">
    
    <Flow></Flow>

    <el-divider />

    
    <!-- <div class="title">
        <div class="选择房源">
          <el-select size='large' v-model="value">
            <el-option v-for="(item,index) in house" :key="index" :label="item.name" :value="index"/>
          </el-select>
          <el-button type="primary" size='large'>搜索</el-button>
        </div>
    </div> -->

    <div class="small-box">
      <el-row class="rowLayout" :gutter="10">
        <el-col :span="8" v-for="(item, index) in house" :key="index" >
          <el-card v-if="(index<numOrders*curPage)&&(index>=numOrders*(curPage-1))"  style = "border-radius: 12px;margin-top:20px;" >
            <template #header>
              <div class = "card-header" style = "margin:0px;">
                <span class="image-font">{{item.name}}</span>
                <el-button class="button" type="text" @click="goHouseDetail(item.rid)">点击查看</el-button>
              </div>
            </template>
            <div class = "card-content"><h2>房间大小:{{item.size}}</h2></div>
            <div class = "card-content" style = "font-size:14px;">房间价格：<span style="color:red">{{item.price}}</span>/(平方米)</div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="title">
      <el-pagination :model="house" background :total="100" @current-change="changeCurPage"/>
    </div>
  </div>
</template>



<script>
import Flow from "../../components/Flow.vue";

export default {
  data(){
      return {
          value:"",
          house:[],
          curPage:1,
          numOrders:6
      }  
    },
    mounted(){
      var data="search_room";
      var that=this;
      this.$axios.post('/room/search_rooms/',JSON.stringify(data)).then(function (request) {
            var content=request.data.content;
            for (var i=0; i< content.length; i++) {
              if(content[i].status==0){
                that.house.push(content[i]);
              }
            }
            
      })
      
    },
    methods:{
      goHouseDetail(id) {
        this.$router.push({
          name: '房源信息',
          params: {
            id: id
          }
        })
      },
      changeCurPage (newVal){
        this.curPage = newVal;
      },  
    },
    components:{
      Flow,
    }
    
}
</script>

<style>
  .coid{
    display: flex;
    align-items: center;
  }

</style>


