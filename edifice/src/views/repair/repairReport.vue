<template>
  <div class="divpadding">

    <el-card style="margin-bottom:30px;">
      <template #header>
        <div class="card-header" style="margin-bottom:0px;">
          <span class="image-font">工单报修</span>
        </div>
      </template>

      <div class="flexItem" style="padding:40px 0;">
        <img src="../../assets/repair.png" style="height: 320px;width: 320px;margin:0 20px 40px -20px" />
        <el-form :model="form" label-width="150px" :rules="rules">
          <el-form-item label="联系人姓名：" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>

          <el-form-item label="报修房间号：" prop="rid">
            <el-select v-model="form.rid" placeholder="">
              <el-option v-for="(item, index) in house" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>

          

          <el-form-item label="报修类型：" prop="type">
            <el-select v-model="form.type" placeholder="">
              <el-option v-for="(i, ind) in problem" :key="ind" :label="i" :value="ind" />
            </el-select>
          </el-form-item>

          <el-form-item label="问题描述：">
            <el-input v-model="form.description" type="textarea" maxlength="100" resize="none" show-word-limit
              :autosize="{ minRows: 5 }" placeholder="请描述问题详情，或希望上门维修的具体时间" />
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
        house:[],
        problem:["水","电","机械","其他"],
        form:{
        rid: "", //报修房间号
        phone: "", //报修联系人姓名和联系方式
        description: "", //问题描述
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
        type: [
          { required: true, message: '请选择报修类型', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var that = this;
      const formData = new FormData();
      formData.append('token', localStorage.getItem('token'))
      this.$axios({
        method: 'POST',
        url: '/get_user_info',
        data: formData
      })
        .then(function (request) {
          console.log(request.data.data);
          that.form.name = request.data.data.name
          that.form.phone = request.data.data.phone

        })
      this.$axios({
        method: 'POST',
        url: '/getLeaseRoom',
        data: formData})
        .then(function (request) {
          //console.log(request.data.data);
          for (var i = 0; i < request.data.data.length; i++)
            that.house.push(request.data.data[i].room_id)
        })


      },
      submit() {
          if(this.form.name&&this.form.rid&&this.form.phone&&this.form.description)
          {
            var that=this;
            const formData=new FormData();
            formData.append('token',localStorage.getItem('token'))
            formData.append('name',this.form.name)
            formData.append('phone',this.form.phone)
            formData.append('rid',this.form.rid)
            formData.append('type',this.form.type)
            formData.append('description',this.form.description)
            this.$axios({
              method: 'POST',
              url: '/repairReport',
              data: formData})
              .then(function (request) {
                //console.log(request.data);
                if(request.data.errno==1004)
                {
                  ElMessage({
                        message: request.data.msg,
                        type: 'error',
                      })
                }
                else
                {
                  ElMessage({
                        message: request.data.msg,
                        type: 'success',
                      })
                  that.$router.push('/myRepair')
                }
            })
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
        this.form.phone="",
        this.value="",
        this.value2="",
        this.form.time="",
        this.form.desc=""
      },

    }
  }
</script>