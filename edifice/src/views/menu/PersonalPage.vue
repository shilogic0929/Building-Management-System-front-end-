<template>
  <div class="home" style="margin-top:20px;">
    <h1 style="margin-bottom:30px;">这是个人资料页</h1>
    <el-card>
        <div class="UserImage">
            <div class="UserImageCon">
                <el-avatar :size="200" :src="url"/>
            </div>
            <div class="UserImageChange">
                <el-button type="primary">更换头像</el-button>
            </div>
        </div>
        <el-form class="personalPage" :model="form" label-width="120px">
            <el-form-item label="姓名">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input v-model="form.phoneNumber" />
            </el-form-item>
            <el-form-item label="身份证号码">
                <el-input v-model="form.IdNumber" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" />
            </el-form-item>    
               
             <el-form-item label="建议区">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

    export default{
        data(){
            return{
                form:{
                    name: "",
                    username:"",
                    sex:"",
                    desc: '',
                    phoneNumber: '',
                    IdNumber:'',
                    email: '',
                },
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            }
        },
        mounted() {
            this.init();
        },
        methods:{
            init(){
                var data={username: this.$store.state.username};
                var that=this;
                this.$axios.post('/user/lookup_user/',JSON.stringify(data)).then(function (request) {
                    var content=request.data.content;
                    console.log(content)
                    that.form.name=content.realname;
                    that.form.username=content.username;
                    that.form.email=content.email;
                    that.form.phoneNumber=content.mobile;
                    that.form.sex=content.sex;
                    that.form.IdNumber=content.id_number;
                })
            },
            onSubmit(){
                var data={
                    username:this.form.username,
                    realname:this.form.name,
                    sex:this.form.sex,
                    desc:this.form.desc,
                    mobile:this.form.phoneNumber,
                    id_number:this.form.IdNumber,
                    email:this.form.email,

                };
                this.$axios.post('/user/modify_user/',JSON.stringify(data)).then(function (request) {
                    console.log(request.data)
                    if(request.data.errno==0){
                        ElMessage({
                            message: request.data.msg,
                            type: 'success',
                        })
                    }
                })
            }
        }
    }


</script>


