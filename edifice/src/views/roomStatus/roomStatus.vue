<template>
  <div>
    <div class="mainArea" style="margin-top: 60px;">
      <div class="left">
        <!-- <RoomMap v-for="(n,index) in 25" :key="index"  :thislevel="n.toString()" ref="'roomMap'+n.toString()"></RoomMap> -->
        <RoomMap :thislevel="'1'" ref="roomMap1"></RoomMap>
        <RoomMap :thislevel="'2'" ref="roomMap2"></RoomMap>
        <RoomMap :thislevel="'3'" ref="roomMap3"></RoomMap>
        <RoomMap :thislevel="'4'" ref="roomMap4"></RoomMap>
        <RoomMap :thislevel="'5'" ref="roomMap5"></RoomMap>
        <RoomMap :thislevel="'6'" ref="roomMap6"></RoomMap>
        <RoomMap :thislevel="'7'" ref="roomMap7"></RoomMap>
        <RoomMap :thislevel="'8'" ref="roomMap8"></RoomMap>
        <RoomMap :thislevel="'9'" ref="roomMap9"></RoomMap>
        <RoomMap :thislevel="'10'" ref="roomMap10"></RoomMap>
        <RoomMap :thislevel="'11'" ref="roomMap11"></RoomMap>
        <RoomMap :thislevel="'12'" ref="roomMap12"></RoomMap>
        <RoomMap :thislevel="'13'" ref="roomMap13"></RoomMap>
        <RoomMap :thislevel="'14'" ref="roomMap14"></RoomMap>
        <RoomMap :thislevel="'15'" ref="roomMap15"></RoomMap>
        <RoomMap :thislevel="'16'" ref="roomMap16"></RoomMap>
        <RoomMap :thislevel="'17'" ref="roomMap17"></RoomMap>
        <RoomMap :thislevel="'18'" ref="roomMap18"></RoomMap>
        <RoomMap :thislevel="'19'" ref="roomMap19"></RoomMap>
        <RoomMap :thislevel="'20'" ref="roomMap20"></RoomMap>
        <RoomMap :thislevel="'21'" ref="roomMap21"></RoomMap>
        <RoomMap :thislevel="'22'" ref="roomMap22"></RoomMap>
        <RoomMap :thislevel="'23'" ref="roomMap23"></RoomMap>
        <RoomMap :thislevel="'24'" ref="roomMap24"></RoomMap>
        <RoomMap :thislevel="'25'" ref="roomMap25"></RoomMap>
      </div>
      <div class="right">
        <el-tabs tab-position="right" @tab-click="jump" v-model="tabName">
          <el-tab-pane v-for="(n, index) in 25" :key="index" :label="n.toString() + '层'" :href="'#roomMap' + (index + 1)"
            :id="'roomMap' + (index + 1)"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
// import { NAnchor, NAnchorLink } from "naive-ui";
import RoomMap from '@/components/RoomMap.vue'
export default {
  data() {
    return {
      height: null,
      tabName: '0',

    };
  },
  components: {
    RoomMap,
  },
  created() {
    this.getHight()
    window.addEventListener('resize', this.getHight)
  },
  destroyed() {
    window.removeEventListener('resize', this.getHight)
    this.$router.replace({ path: '/empty' })
    console.log('destroyed');
  },
  watch: {
    '$route': 'getPath'
  },
  methods: {
    getPath() {
      location.reload()
      // this.$router.replace({ path: '/empty', })
      // console.log('destroyed');
      // console.log('getPath');
      // console.log(this.$route);

    },
    getHight() {
      this.height = document.documentElement.clientHeight - 50 + 'px'

    },
    jump(tab) {
      var str = JSON.parse(JSON.stringify(tab)).props.label
      str = str.substr(0, str.length - 1);
      console.log(str)
      const selectedIndex = parseInt(str);
      //console.log('selectedIndex:', selectedIndex);
      // 构建要跳转的锚点的名称
      const anchorName = 'roomMap' + selectedIndex;
      //console.log('anchorName:')
      //console.log(anchorName);
      // 获取对应的 RoomMap 组件的引用
      const roomMapRef = this.$refs[anchorName];
      console.log(roomMapRef)
      // 滚动到相应的锚点
      if (roomMapRef) {
        roomMapRef.$el.scrollIntoView({
          behavior: 'smooth',
          block: "end"
        });
      }
    },
  }
}
</script>
<style>
.el-tabs__item {
  height: 24px;
}

/* .container {
  height: ;
} */

.right {
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translate(0, -50%);
}
</style>