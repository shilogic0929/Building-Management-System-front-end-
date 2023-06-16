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
                <div>
                  <el-button type="text" @click="see">查看个人报修</el-button>
                  <el-button type="text" @click="submit">提交</el-button>
                </div>
            </div>
        </template>

    <div class="formStyle margin-top">
        <el-form :model="form" label-width="120px">
            <el-form-item label="姓名">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.telephone" />
            </el-form-item>

            <el-form-item label="问题房源">
                <el-select v-model="value" placeholder="">
                    <el-option v-for="(item,index) in house" :key="index" :label="item.name" :value="item.rid" />
                </el-select>
            </el-form-item>

          <el-form-item label="报修类型">
            <el-select v-model="value2" placeholder="">
              <el-option :label="form.info2[0]" value="1" />
              <el-option :label="form.info2[1]" value="2" />
              <el-option :label="form.info2[2]" value="3" />
              <el-option :label="form.info2[3]" value="4" />
            </el-select>
          </el-form-item>
           


          <el-form-item label="备注">
                <el-input v-model="form.desc" type="textarea" />
          </el-form-item>

<!--          <el-steps :space="100" :active="statue" finish-status="success">-->
<!--            <el-step title="Done" />-->
<!--            <el-step title="Processing" />-->
<!--            <el-step title="Step 3" />-->
<!--            <el-step title="Step 3" />-->
<!--          </el-steps>-->


          <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

    </div>
    </el-card>

  </div>

</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data(){
      return {
        value:"",
        value2:"",
        house:[],
          form:{
            name:"",
            telephone:"",
            date1:"",
            date2:"",
            desc:"",
            info:["房屋1","房屋2","",""],
            info2:["墙壁损坏","房屋漏水","家电维修","其他"],
          },
         
      }  
    },
    mounted() {
        this.init()
    },
    methods:{
      init() {
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
        
      })
        
        },
      submit(){
          console.log(this.value);
          var data={
            rid:this.value,
            info:this.form.desc,
            type:this.value2
          };
          console.log(data);
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
      },
      see(){
          this.$router.push("/myRepair")
      }
          
    },
}

</script>

