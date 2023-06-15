<template>
  <div >
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
        <div class="zz">
            <h2>管理房源界面</h2>
        </div>
    </div>
    <div class="serviceGrid">
        <el-card>
            <template #header>
                <div class = "card-header" style = "margin:0px;">
                    <span class="image-font">房源列表</span>
                    <div>
                        <el-button type="text" size="large" @click="addHouse">添加房源</el-button>
                        <el-button type="text" size="large" @click="seeLoseHouse">查看下架房源</el-button>
                        <el-button class="button" type="text" @click="this.$router.go(-1)">返回</el-button>
                    </div>
                </div>
            </template>
            <div v-for="(item,index) in house" :key="index" >
                <div class="container" v-if="item.status>=0">
                    <span class="title">{{item.name}}</span>
                    <div>
                        <el-button type="primary" size="large" @click="goHouseDetail(item.rid)">查看房源</el-button>
                        <el-button type="primary" size="large" @click="deleteHouse(index)">下架房源</el-button>
                    </div>
                </div>
                <el-divider v-if="item.status>=0"></el-divider>
            </div>
        </el-card>
    </div>

     <el-dialog v-model="valid" title="下架房源" width="45%">
         <div class="serviceGrid">
            <el-card v-if="delNum>0">
                <div v-for="(item,index) in house" :key="index" >
                        <div class="container" v-if="item.status<0">
                            <span class="title">{{item.name}}</span>
                            <div>
                                <el-button type="primary" size="large" @click="goHouseDetail(item.id)">查看房源</el-button>
                                <el-button type="primary" size="large" @click="changeHouseStatus(index)">恢复房源</el-button>
                            </div>
                        </div>
                        <el-divider v-if="item.status<0"></el-divider>
                    </div>
            </el-card>
          </div>
        <h2 v-if="delNum==0">无</h2>
    </el-dialog>


  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner4.jpg"),
        visible:false,
        house:[],
        valid:false,
        delNum:0,
    }
  },
  mounted() {
      this.init();
  },
  methods:{
    init(){
        var data="search_room";
        var that=this;
        this.$axios.post('/room/search_rooms/',JSON.stringify(data)).then(function (request) {
            console.log(request.data.content);
            that.house=request.data.content;
        })
        setTimeout(()=>{
            this.delNum=0;
            console.log(this.house);
            for(var i=0;i<this.house.length;i++){
                console.log(this.house[i]);
                if(this.house[i].status<0) this.delNum++;
            }
             console.log(this.delNum);
        },2000)
    },
    addHouse(){
       this.$router.push({
          name: '添加房源细节',
          params: {
          }
        })
    },
    goHouseDetail(id) {
        this.$router.push({
          name: '房源信息',
          params: {
            id: id
          }
        })
    },
    deleteHouse(index){
        var data={
            rid:this.house[index].rid
        };
        this.delNum++;
        this.$axios.post('/room/remove_room/',JSON.stringify(data)).then(function (request) {
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
        console.log(this.house);
        
    },
    seeLoseHouse(){
        this.valid=true;
    },
    changeHouseStatus(index){
        this.delNum--;
        this.house[index].status=1;
        var data={rid:this.house[index].rid}
        this.$axios.post('/room/readd_room/',JSON.stringify(data)).then(function (request) {
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

