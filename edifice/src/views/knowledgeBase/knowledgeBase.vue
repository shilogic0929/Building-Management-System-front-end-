<template>
  <div class="divpadding">

    <el-card style="margin-bottom:30px;">
      <template #header>
        <div class="card-header" style="margin-bottom:0px;">
          <span class="image-font">维修知识库</span>
          <el-button class="button" type="text" @click="this.isAdd = true" v-if="clientType === '-1'">新增信息</el-button>
        </div>
      </template>
      <div class="fliterTag">
        <el-tag class="ml-2" effect="plain" type="info" @click="showAll">全部</el-tag>
        <el-tag class="ml-2" @click="showWater">水</el-tag>
        <el-tag class="ml-2" type="warning" @click="showElec">电</el-tag>
        <el-tag class="ml-2" type="info" @click="showMech">机械</el-tag>
        <el-tag class="ml-2" type="success" @click="showOther">其他</el-tag>
      </div>

      <div class="QandAs" style="text-align: start;">
        <div class="QandA" v-for="(item, ind) in showData" :key="ind">
          <p class="knowTitle">
            <span style="margin-left: 10px;">{{ item.problem }}</span>

            <el-tag class="ml-2" effect="plain" type="info" v-if="problem[item.type - 1] === 0">全部</el-tag>
            <el-tag class="ml-2">水</el-tag>
            <el-tag class="ml-2" type="warning">电</el-tag>
            <el-tag class="ml-2" type="info">机械</el-tag>
            <el-tag class="ml-2" type="success">其他</el-tag>

            <!-- <el-icon>
              <Orange v-if="item.type == 1" />
              <Opportunity v-else-if="item.type == 2" />
              <Setting v-else-if="item.type == 3" />
              <Crop v-else />
            </el-icon> -->
            <!-- {{ problem[item.type - 1] }} -->
          </p>
          <hr style="background-color: rgb(153, 197, 241);opacity: 0.3;" />
          <p>问题：{{ item.problem }}</p>
          <p>解决方式：{{ item.solution }}</p>
        </div>
      </div>
    </el-card>

    <el-dialog v-model="isAdd" title="新增信息" style="width: 40% !important; min-width: 100px !important;">
      <el-form label-position="right" label-width="120px" :model="form" :rules="rules">
        <el-form-item label="报修类型：" prop="type">
          <el-select v-model="form.type" placeholder="">
            <el-option v-for="(i, ind) in problem" :key="ind" :label="i" :value="ind" />
          </el-select>
        </el-form-item>
        <el-form-item label="问题：" prop="problem">
          <el-input v-model="form.problem"></el-input>
        </el-form-item>
        <el-form-item label="解决办法：" prop="solution">
          <el-input type="textarea" v-model="form.solution" maxlength="100" resize="none" show-word-limit
            :autosize="{ minRows: 5 }" placeholder="请填写解决问题方法"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="info" @click="visible = false">取消</el-button>
          <el-button type="primary" @click="addKnowledge()">确认</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      isAdd: false,
      showData: [],
      solutions: [],
      waters: [],
      elecs: [],
      mechs: [],
      other: [],
      clientType: "0",
      problem: ["水", "电", "机械", "其他"],
      form: {
        problem: "",
        solution: "",
        type: 0,
      },
      rules: {
        solution: [
          { required: true, message: '请填写解决方法', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择问题类型', trigger: 'blur' }
        ],
        problem: [
          { required: true, message: '请填写具体问题', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.clientType = localStorage.getItem('type')
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var that = this;
      const formData = new FormData();
      formData.append('token', localStorage.getItem('token'))
      this.$axios({
        method: 'POST',
        url: '/getSolution',
        data: formData
      })
        .then(function (request) {
          console.log(request.data.data);
          that.solutions = request.data.data
          that.showData = that.solutions
          for (var i = 0; i < that.solutions.length; i++) {
            switch (that.solutions[i].type) {
              case 1:
                that.waters.push(that.solutions[i])
                break;
              case 2:
                that.elecs.push(that.solutions[i])
                break;
              case 3:
                that.mechs.push(that.solutions[i])
                break;
              default:
                that.other.push(that.solutions[i])
            }
          }
        })
    },
    showAll() {
      this.showData = this.solutions
    },
    showWater() {
      this.showData = this.waters
    },
    showElec() {
      this.showData = this.elecs
    },
    showMech() {
      this.showData = this.mechs
    },
    showOther() {
      this.showData = this.other
    },
    addKnowledge() {
      if (this.form.problem && this.form.solution) {
        var that = this;
        const formData = new FormData();
        formData.append('token', localStorage.getItem('token'))
        formData.append('problem', this.form.problem)
        formData.append('type', this.form.type + 1)
        formData.append('solution', this.form.solution)

        this.$axios({
          method: 'POST',
          url: '/addSolution',
          data: formData
        })
          .then(function (request) {
            //console.log(request.data);
            if (request.data.errno) {
              ElMessage({
                message: request.data.msg,
                type: 'error',
              })
            }
            else {
              ElMessage({
                message: request.data.msg,
                type: 'success',
              })
              that.init();
            }
          })
      }
      else {
        ElMessage({
          message: "请完善信息",
          type: 'warning',
        })
      }
    }
  }
}
</script>

<style scoped>
.fliterTag {
  text-align: start;
}

.ml-2 {
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
}

.QandAs {
  margin-top: 20px;
  background: #f8f8f8;
}

.QandA {
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  padding: 8px 8px;
  width: 260px;
  height: 200px;
  /* border: 1px solid rgb(153, 197, 241); */

  margin-left: 20px;
  background: #ffffff;
  border-radius: 36px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
}

.QandA:hover {
  box-shadow: 0 0 2px 2px #f8f8f8;
}

.knowTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  /* padding: 5px 0 5px 0;
  margin-left: 20px;
  margin-top: 20px; */
  margin: 20px 10px 20px 10px;
}
</style>