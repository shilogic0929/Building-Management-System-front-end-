<template>
  <div>
    <div class="inner-banner" :style="{backgroundImage: 'url(' + img + ')', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
        <div class="zz">
            <h2>添加房源界面</h2>
        </div>
    </div>    

    <div>
        <el-card width="800px;">
            <template #header>
                <div class = "card-header" style="margin-bottom:0px;">
                    <span class="image-font" >房源信息</span>
                    <el-button class="button" type="text" @click="this.$router.go(-1)">返回</el-button>
                </div>
            </template>
            <el-form class="formStyle" :model="form" label-width="120px">
                <el-form-item label="房源名称">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>

                <el-form-item label="房源类型">
                    <el-select v-model="form.type" placeholder="选择房源类型" size="large">
                        <el-option value="单人间"/>
                        <el-option value="双人间"/>
                        <el-option value="四人间"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="房源大小">
                    <el-input v-model="form.size" ></el-input>
                </el-form-item>

                <el-form-item label="租金(每月)">
                    <el-input v-model="form.money" ></el-input>
                </el-form-item>

                <el-form-item label="房源城市">
                    <el-input v-model="form.city" ></el-input>
                </el-form-item>

                <el-form-item label="房源地址">
                    <el-input v-model="form.address" ></el-input>
                </el-form-item>
                
                <el-form-item label="房东姓名">
                    <el-input v-model="form.managerName" ></el-input>
                </el-form-item>

                <el-form-item label="房东电话">
                    <el-input v-model="form.telephone" ></el-input>
                </el-form-item>

                <el-form-item label="房东邮箱">
                    <el-input v-model="form.email" ></el-input>
                </el-form-item>

                <el-form-item label="房间描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  data(){
    return{
        img:require("@/assets/image/inner-banner10.jpg"),
        form:{
            id:"",
            name:"",
            size:"",
            money:"",
            telephone:"",
            city:"",
            address:"",
            email:"",
            managerName:"",
            type:"",
            desc:"",
        }
    }
  },
  mounted() {
    
  },
  methods:{
    onSubmit(){
        console.log(this.form.type);
        var v;
        if(this.form.type == "单人间") v=1;
        else if(this.form.type == "双人间") v=2;
        else if(this.form.type == "四人间") v=4;
        var data = {
            name:this.form.name,
            size:this.form.size,
            price:this.form.money,
            mobile:this.form.telephone,
            city:this.form.city,
            address:this.form.address,
            email:this.form.email,
            desc:this.form.desc,
            managerName:this.form.managerName,
            type:v,
        }
        this.$axios.post('/room/add_room/',JSON.stringify(data)).then(function (request) {
            if(request.data.errno==0){
                ElMessage({
                  message: request.data.msg,
                  type: 'success',
                })  
              }
              else{
                ElMessage.error(request.data.msg)
              }
        });   
    },
  }
  

}
</script>

