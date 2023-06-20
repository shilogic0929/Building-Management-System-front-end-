<template>
  <div class="home" style="margin-top:20px;">
    <h1 style="font-size: 30px;">个人基本信息</h1>
    <div class="rrrr">
        <img style="height: 350px;" src="@/assets/img/2.jpg"  />
        <el-card class="card">
            <div class="patton">
            <p class="text"><el-text class="text">法人名称:{{ legal }}</el-text></p>
            <p class="text"><el-text class="text">公司名称:{{ company }}</el-text></p>
            <p class="text"><el-text class="text">姓名:{{ name }}</el-text></p>
            <p class="text"><el-text class="text">电话:{{ phone }}</el-text></p>
            </div>
        </el-card>
    </div>
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
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                name: '小王',
                phone: '123',
                legal: '徐惠彬',
                company:'北京航空航天大学',
            }
        },
        mounted() {
            this.init();
        },
        methods:{
            init(){
                var that=this;
                const data = new FormData()
                data.append('token', localStorage.getItem('token'))
                this.$axios({
                    method:'POST',
                    url: '/test/get_user_info',
                    data: data
                }).then(res => {
                    if (res.data.errno === 0) {
                        this.name = res.data.username,
                        this.phone = res.data.phone,
                        this.legal = res.data.legal_person,
                        this.company = res.data.company
                    }
                    else {

                    }
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
<style>
.text {
    font-size: 25px;
    line-height: 2;
    flex-grow: 1;
}
.patton {
    height: 350px;
    text-align: left;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
}
.card {
    width: 500px;
    height: 350px;
    top: 20px;
    right: 0;
    margin-left: 10px; /* 可根据需要调整卡片与图像的间距 */
}
.rrrr {
display: flex;
align-items: center; /* 垂直居中对齐 */
margin-top: 20px;
margin-left: 10px;
}


</style>

