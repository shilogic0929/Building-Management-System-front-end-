<template>
  <div>
    <div class="right">
      <a href="2f">123</a>
      <n-anchor affix :show-rail="true" :show-background="false" ignore-gap>
        <n-anchor-link v-for="n in 25" :key="n" :title="n.toString() + '层'" :href="'#' + n + 'f'" />
        <!--
        <n-anchor-link title="1层" href="#id" />
        <n-anchor-link title="2层" href="#id" /> -->
      </n-anchor>
    </div>
    <div>
      <RoomMap ref="f1" :thislevel="'1'" id="1f"></RoomMap>
      <RoomMap :thislevel="'2'" id="2f"></RoomMap>
      <RoomMap :thislevel="'3'"></RoomMap>
      <!--  <RoomMap :thislevel="'4'"></RoomMap>
      <RoomMap :thislevel="'5'"></RoomMap>
      <RoomMap :thislevel="'6'"></RoomMap>
      <RoomMap :thislevel="'7'"></RoomMap>
      <RoomMap :thislevel="'8'"></RoomMap>
      <RoomMap :thislevel="'9'"></RoomMap>
      <RoomMap :thislevel="'10'"></RoomMap>
      <RoomMap :thislevel="'11'"></RoomMap>
      <RoomMap :thislevel="'12'"></RoomMap>
      <RoomMap :thislevel="'13'"></RoomMap>
      <RoomMap :thislevel="'14'"></RoomMap>
      <RoomMap :thislevel="'15'"></RoomMap>
      <RoomMap :thislevel="'16'"></RoomMap>
      <RoomMap :thislevel="'17'"></RoomMap>
      <RoomMap :thislevel="'18'"></RoomMap>
      <RoomMap :thislevel="'19'"></RoomMap>
      <RoomMap :thislevel="'20'"></RoomMap>
      <RoomMap :thislevel="'21'"></RoomMap>
      <RoomMap :thislevel="'22'"></RoomMap>
      <RoomMap :thislevel="'23'"></RoomMap>
      <RoomMap :thislevel="'24'"></RoomMap>
      <RoomMap :thislevel="'25'"></RoomMap> -->
    </div>

  </div>
</template>

<script>
import { NAnchor, NAnchorLink } from "naive-ui";
import RoomMap from '@/components/RoomMap.vue'
export default {
  data() {
    return {
      anchorRef: null,
    };
  },
  components: {
    RoomMap,
    NAnchor,
    NAnchorLink
  },

  methods: {
    scrollTo(href) {
      this.anchorRef.scrollTo(href);
    }
  }
}
</script>
<style>
/* .el-tabs__item {
  height: 30px;
} */

/* .right {
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translate(0, -50%);
} */
</style>