<template>
  <div class="serviceGrid">
      <el-card>
        <template #header>
          <div class = "card-header" style = "margin:0px;">
            <span class="image-font">查看个人信息</span>
          </div>
        </template>
        <div class="flexItem" style="padding: 20px 0;">
          <el-form :model="form" label-width="150px">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="form.name" :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="联系方式：" prop="phone">
                <el-input v-model="form.phone" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="法人：" prop="legal">
              <el-input v-model="form.legal" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="公司：" prop="company">
              <el-input v-model="form.company" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="维修类型：" prop="type" v-if="form.type>0">
              <el-input v-model="types[form.type-1]" disabled/>
            </el-form-item>

            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="form.email" :disabled="disabled"/>
            </el-form-item>

            <el-form-item label="个人描述：">
              <el-input :disabled="disabled" v-model="form.desc" type="textarea" maxlength="100" resize="none"
              show-word-limit  :autosize="{ minRows: 5}"/>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit()" :disabled="disabled">提交</el-button>
            </el-form-item>
          </el-form>

        </div>
      </el-card>
    </div>
</template>

<script>
//import { ElMessage } from 'element-plus'

    export default{
        data(){
        return {
              disabled:true,
              types:['水','电','机械','其他'],
              form:{
                name: '小王',
                phone: '123',
                legal: '徐惠彬',
                company:'北京航空航天大学',
                email: "",
                desc: "",
                type: "",
                is_available: 0
              }
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
                this.form.type=parseInt(localStorage.getItem('type'))
                this.$axios({
                    method:'POST',
                    url: '/get_user_info',
                    data: data
                }).then(res => {
                    if (res.data.errno === 0) {
                        var re=res.data.data
                        that.form.name = re.name,
                        that.form.phone = re.phone,
                        that.form.legal = re.legal_person,
                        that.form.company = re.company,
                        that.form.email = re.email,
                        that.form.desc = re.description
                        that.form.type = re.type
                        that.form.is_available = re.is_available
                        if (re.type == -1) that.disabled = false
                    }
                })
            },
            onSubmit(){
              const formData = new FormData()
              formData.append('token',localStorage.getItem("token"))
              formData.append('new_name', this.form.name)
              formData.append('new_phone', this.form.phone)
              formData.append('new_company', this.form.company)
              formData.append('new_legal', this.form.legal)
              formData.append('new_email', this.form.email)
              formData.append('new_description',this.form.desc)
              this.$axios({
                method: 'POST',
                url: '/changeUserInfo',
                data:formData
              }).then(res => {
                if (res.errno === 0) {
                  ElMessage({
                    type: 'success',
                    message: '修改成功'
                  })
                  this.init()
                }
              })
            }
        }
    }


</script>
<style scoped>
.el-input {
    width: 350px;
  }

.el-textarea{
  width: 350px;
}
</style>

