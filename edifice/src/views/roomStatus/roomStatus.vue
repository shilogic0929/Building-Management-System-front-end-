<template>
  <div class="container">
    <div class="left">
      <RoomMap :thislevel="'1'"></RoomMap>
      <RoomMap :thislevel="'2'"></RoomMap>
      <RoomMap :thislevel="'3'"></RoomMap>
      <RoomMap :thislevel="'4'"></RoomMap>
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
      <RoomMap :thislevel="'25'"></RoomMap>
    </div>
    <div class="right">
      <el-tabs tab-position="right" style="height: 1000px;">
        <el-tab-pane v-for="n in 25" :key="n" :label="n.toString()"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import RoomMap from '@/components/RoomMap.vue'
export default {
  components: {
    RoomMap
  }
}
</script>


<style>
.container {
  /* display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between; */
}

.left {
  /* flex: 0.7; */
}

.right {

  /* flex: 0.3; */
}
</style>