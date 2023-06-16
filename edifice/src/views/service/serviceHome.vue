<template>
<div>
  <div class="service"></div>
  <div class="serviceTitle">
      <span>客服管理界面</span>
  </div>
  <div class="serviceCarousel">
  <el-carousel height="500px" :autoplay="false"  type="card">
      <el-carousel-item>
        <el-space wrap :size="8">
          <el-card class="serviceCard">
            <div class="content">
              <div class="service-icon">
                  <el-icon><Brush /></el-icon>
              </div>
              <h3>添加房源</h3>
              <p>客服可以手动添加/删除房源</p>
              <el-button @click="addHouse">跳转</el-button>
            </div>
          </el-card>
        </el-space>
      </el-carousel-item>

      <el-carousel-item>
        <el-space wrap :size="8">
          <el-card class="serviceCard">
            <div class="content">
              <div class="service-icon">
                  <el-icon><Brush /></el-icon>
              </div>
              <h3>审核订单</h3>
              <p>客服可以审核用户的长租/短租订单</p>
              <el-button @click="vOrders">跳转</el-button>
            </div>
          </el-card>
        </el-space>
      </el-carousel-item>

      <el-carousel-item>
        <el-space wrap :size="8">
          <el-card class="serviceCard">
            <div class="content">
              <div class="service-icon">
                  <el-icon><Brush /></el-icon>
              </div>
              <h3>审核合同</h3>
              <p>客服可以审核用户上传的合同</p>
              <el-button @click="vContract">跳转</el-button>
            </div>
          </el-card>
        </el-space>
      </el-carousel-item>

      <el-carousel-item>
        <el-space wrap :size="8">
          <el-card class="serviceCard">
            <div class="content">
              <div class="service-icon">
                  <el-icon><Brush /></el-icon>
              </div>
              <h3>报修处理</h3>
              <p>处理租客们的报修申请</p>
              <el-button @click="vRepair">跳转</el-button>
            </div>
          </el-card>
        </el-space>
      </el-carousel-item>

    <el-carousel-item>
      <el-space wrap :size="8">
        <el-card class="serviceCard">
          <div class="content">
            <div class="service-icon">
              <el-icon><Brush /></el-icon>
            </div>
            <h3>查看用户</h3>
            <p>查看所有用户的相关信息</p>
            <el-button @click="vUsers">跳转</el-button>
          </div>
        </el-card>
      </el-space>
    </el-carousel-item>

    </el-carousel>
  </div>
</div>
</template>


<script>

export default {
  data(){
    return{

    }
  },
  mounted() {

  },
  methods:{
    addHouse(){
       this.$router.push({
          name: '添加房源',
          params: {

          }
        })
    },
    vContract(){
       this.$router.push({
          name: '审核合同',
          params: {

          }
        })
    },
    vRepair(){
       this.$router.push({
          name: '报修处理',
          params: {

          }
        })
    },
    vUsers(){
      this.$router.push({
        name: '查看用户信息',
        params: {

        }
      })
    },
    vOrders(){
      this.$router.push({
        name: '审核订单',
        params: {

        }
      })
    }
  }


}
</script>
