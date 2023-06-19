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
        <el-form :model="form" label-width="150px" :rules="rules">
          <el-form-item label="联系人姓名：" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
              <el-input v-model="form.phone" />
          </el-form-item>

          <el-form-item label="报修房间号：" prop="rid">
            <el-select v-model="form.rid" placeholder="">
              <el-option v-for="(item,index) in house" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>

          <el-form-item label="报修类型：" prop="type">
            <el-select v-model="form.type" placeholder="">
              <el-option v-for="(i,ind) in problem" :key="ind" :label="i" :value="ind" />
            </el-select>
          </el-form-item>

          <el-form-item label="报修时间：" prop="repair_time">
              <el-input v-model="form.repair_time" />
          </el-form-item>

          <el-form-item label="问题描述：">
            <el-input v-model="form.description" type="textarea" />
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
import { ElMessage } from 'element-plus'
export default {
  data(){
      return {
        house:[12,23,44],
        problem:["水","电","机械","其他"],
        form:{
          name:"",
          rid: 99, //报修房间号
          phone:"", //报修联系人姓名和联系方式
          repair_time: "", //报修时间
          description:"", //问题描述
          type: 1
        },
        rules: {
          name: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ],
          rid: [
            { required: true, message: '房间号不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '联系方式不能为空', trigger: 'blur' }
          ],
          repair_time: [
            { required: true, message: '请填写维修时间', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择报修类型', trigger: 'blur' }
          ],
        }
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
          if(this.form.name&&this.form.rid&&this.form.phone&&this.form.repair_time)
          {
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
          }
          else
          {
            ElMessage({
                        message: "请完善报修信息",
                        type: 'warning',
                      })
          }
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

