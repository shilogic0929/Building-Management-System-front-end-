<template>
  <div>

    <div class="desLeft" style="margin-top:20px;">
      <el-card>
        <template #header>
          <div class = "card-header" style="margin-bottom:0px;">
            <span class="image-font">上传合同</span>
            <el-button class="button" type="text" @click="this.$router.go(-1)">返回</el-button>
          </div>
        </template>


        <div class="margin-top">

          <el-form :model="form" label-width="120px">
            <el-form-item label="姓名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.telephone" />
            </el-form-item>

            <el-form-item label="选择服务">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="Online activities" name="type" />
                <el-checkbox label="Promotion activities" name="type" />
                <el-checkbox label="Offline activities" name="type" />

              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor" />
                <el-radio label="Venue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>

            <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </template>
            </el-upload>

            <el-form-item>
              <el-button type="primary" @click="seeContract" style="margin-top: 50px">查看合同</el-button>
              <el-button type="primary" @click="onSubmit" style="margin-top: 50px">提交</el-button>
              <el-button style="margin-top: 50px">取消</el-button>
            </el-form-item>
          </el-form>

        </div>
      </el-card>
    </div>

    <div class="desRight" style="margin-top:20px;">
      <el-card>
        <template #header>
          <div class = "card-header" style="margin-bottom:0px;">
            <span class="image-font"  style="color:black;font-size:16px;">信息</span>
          </div>
        </template>

      </el-card>

      <el-card>
        <template #header>
          <div class = "card-header" style="margin-bottom:0px;">
            <span class="image-font"  style="color:black;font-size:16px;margin-bottom:10px;">标签</span>
          </div>
        </template>
        <div class="taglist">
          <ul>
            <li class="taglistli"><el-icon class="icon-arrow"><CaretRight /></el-icon><a>学区房(2)</a></li>
            <li class="taglistli"><el-icon class="icon-arrow"><CaretRight /></el-icon><a>地铁站(3)</a></li>
            <li class="taglistli"><el-icon class="icon-arrow"><CaretRight /></el-icon><a>大平层(5)</a></li>
            <li class="taglistli"><el-icon class="icon-arrow"><CaretRight /></el-icon><a>购物中心(6)</a></li>
          </ul>
        </div>
      </el-card>

      <el-card>
        <template #header>
          <div class = "card-header" style="margin-bottom:0px;">
            <span class="image-font"  style="color:black;font-size:16px;margin-bottom:10px;">推荐房源</span>
          </div>
        </template>

        <el-carousel height="270px">
          <el-carousel-item>
            <img src="@/assets/image/h1.png">
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/image/h2.png">
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/image/h3.png">
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/image/h4.png">
          </el-carousel-item>
        </el-carousel>

      </el-card>
    </div>

  </div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import { UploadFilled } from '@element-plus/icons-vue'

export default {
  data(){
    return {
      form:{
        name:"",
        telephone:"",
        date1:"",
        date2:"",
        desc:"",
      },

    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {

    },
    onSubmit(){

    }

  },
}
</script>