<template>
  <div class="divpadding">
    <div class="flow">
      <el-carousel class="repairCarousel" :interval="5000"  style="margin-bottom: 50px" indicator-position="none">
        <el-carousel-item class="repairImage">
          <img src="@/assets/image/bx2.jpg" alt="img30">
        </el-carousel-item>
        <el-carousel-item class="repairImage">
          <img src="@/assets/image/bx3.jpg" alt="img30">
        </el-carousel-item>
        <el-carousel-item class="repairImage">
          <img src="@/assets/image/bx1.jpg" alt="img30">
        </el-carousel-item>
      </el-carousel>
      <div class="repairTitle">报修界面</div>
    </div>


    <el-card style="margin-bottom:30px;">
      <template #header>
        <div class = "card-header" style="margin-bottom:0px;">
          <span class="image-font">报修</span>
        </div>
      </template>

      <div class="flexItem">
        <img src="../../assets/repair.png" style="height: 320px;width: 320px;margin:0 20px 40px -20px"/>
        <el-form :model="form" label-width="150px">
          <el-form-item label="联系人姓名：">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="联系方式：">
              <el-input v-model="form.telephone" />
          </el-form-item>

          <el-form-item label="报修房间号：">
            <el-select v-model="value" placeholder="">
              <el-option v-for="(item,index) in house" :key="index" :label="item.name" :value="item.rid" />
            </el-select>
          </el-form-item>

          <el-form-item label="报修类型：">
            <el-select v-model="value2" placeholder="">
              <el-option v-for="(i,ind) in form.problem" :key="ind" :label="i" :value="ind" />
            </el-select>
          </el-form-item>

          <el-form-item label="报修时间：">
              <el-input v-model="form.problemTime" />
          </el-form-item>

          <el-form-item label="问题描述：">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="clear">清空</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-card>

  </div>

</template>

<script>
//import { ElMessage } from 'element-plus'
export default {
  data(){
      return {
        value:"", //报修房间号
        value2:"",
        house:[],
          form:{
            name:"",
            telephone:"", //报修联系人姓名和联系方式
            problemTime: "", //报修时间
            desc:"", //问题描述
            problem:["水","电","机械","其他"],
          },
         
      }  
    },
    mounted() {
        this.init()
    },
    methods:{
      init() {
        /*
        var data={username: this.$store.state.username} 
        var that=this;
        let uid;
        
        this.$axios.post('/user/lookup_user/',JSON.stringify(data)).then(function (request) {
            console.log(request.data.content);
            uid = request.data.content.uid;
          })
        
        data="search_room";
        setTimeout(() =>{
          this.$axios.post('/room/search_rooms/',JSON.stringify(data)).then(function (request) {
            var content=request.data.content;
            for (var i=0; i< content.length; i++) {
              if(content[i].uid==uid) {
                that.house.push(content[i]);
              }
            }
        },1000)
        })*/
      },
      submit(){
          console.log(this.value);
          var data={
            rid:this.value,
            type:this.value2,
            info:this.form.desc
          };
          console.log(data);
          /*
          this.$axios.post('/workorder/create_workorder/',JSON.stringify(data)).then(function (request) {
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
          */
      },
      see(){
          this.$router.push("/myRepair")
      },
      clear(){
        this.form.name="",
        this.form.telephone="",
        this.value="",
        this.value2="",
        this.form.problemTime="",
        this.form.desc=""
      },
    },
}

</script>

