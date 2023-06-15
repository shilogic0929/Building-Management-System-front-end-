<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  mounted() {
      window.addEventListener('unload',this.saveState)
  },
  methods: {
    saveState(){
      var data ={
        isService:this.$store.state.isService,
        isWorker:this.$store.state.isWorker,
        username:this.$store.state.username,
      }
      sessionStorage.setItem("state",JSON.stringify(data));
    }
  },
}
</script>


<style lang="scss"></style>







