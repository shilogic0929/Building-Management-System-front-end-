<template>
<div>
  <div class="service"></div>
  <div class="serviceTitle">
      <span>大厦物业管理系统</span>
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
              <h3>查看房源</h3>
              <p>点击以跳转到房源界面</p>
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
              <h3>查看订单</h3>
              <p>点击以跳转到订单界面</p>
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
              <h3>查看合同</h3>
              <p>点击以跳转到合同界面</p>
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
              <h3>进行评价</h3>
              <p>点击以跳转到评价界面</p>
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
            <h3>工单保修</h3>
            <p>点击以跳转到工单界面</p>
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
          name: '查看房源',
          params: {

          }
        })
    },
    vContract(){
       this.$router.push({
          name: '查看合同',
          params: {

          }
        })
    },
    vRepair(){
       this.$router.push({
          name: '评价系统',
          params: {

          }
        })
    },
    vUsers(){
      this.$router.push({
        name: '进行报修',
        params: {

        }
      })
    },
    vOrders(){
      this.$router.push({
        name: '查看订单',
        params: {

        }
      })
    }
  }


}
</script>
