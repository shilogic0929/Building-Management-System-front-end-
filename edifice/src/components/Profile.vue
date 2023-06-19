<template>
  <section class="profile-section" id="profile">
    <!-- 简介 -->
    <div class="profile-container">
      <div class="left-area">
        <div class="bg-area">
          <a href="#/seeHouse">
            <img src="@/assets/image/living-room.jpg" alt="" class="img-curry c-img-left"/>
          </a>

          <p>
            本系统旨在为注册用户提供全方位的服务，从而让用户在使用本平台的过程中可以享受到无微不至的服务，从而进一步为用户提供许许多多的便利，让用户拥有更加良好的使用体验。
          </p>
          <a href="#/seeHouse">
            <i class="fa fa-weibo"></i
          ></a>
          <br />
          <a href="#/seeHouse" class="btn-a">
            了解更多</a>
        </div>
      </div>

      <div class="right-area">
        <div class="bg-area">
          <a
            href="#/appraise"
            ><img
              src="~@/assets/image/furniture.jpg"
              alt=""
              class="img-curry c-img-right"
          /></a>

          <p>
           本系统用于为大厦的管理提供简单而又便捷的服务，让管理员能够用更少的时间来完成更多的事情，处理事情能够更加有效率，从而让大厦的管理在本系统的使用下更加井井有条。
          </p>
          <!-- 使用了图标库font-awesome -->
          <a
            href="#/appraise"
            ><i class="fa fa-weibo"></i
          ></a>
          <br />
          <a
            href="#/appraise"
            class="btn-a"
            >了解更多</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

  methods:{
    goRent(){
      this.$router.push("/seeHouse")
    }
  }
};
</script>

<style scoped>
.profile-section {
  padding: 50px 15px 50px;
  margin: 20px auto;
}
.profile-container {
  width: 1220px;
  padding-left: 15px;
  padding-right: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 120px;
}
.left-area,
.right-area {
  display: inline-block;
  text-align: center;
  width: 50%;
  height: 550px;
  position: relative;
  /* margin: 0px 20px; */
}
.img-curry {
  border-radius: 50%;
  width: 350px;
  height: 350px;
  margin-top: -120px;
  border: 10px solid rgb(215, 215, 215);
}
.img-curry:hover {
  border: 10px solid rgb(140, 140, 140);
}
.left-area p,
.right-area p {
  width: 90%;
  line-height: 25px;
  font-size: 17px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  padding: 0px 20px;
  margin: 0px 10px !important;
}
.bg-area {
  background-color: rgb(253, 253, 253);
  margin: 0px 50px;
  height: 590px;
  box-shadow: 0px 56px 36px -60px #121d12;
}
.btn-a {
  text-decoration: none;
  background-color: rgb(0, 161, 214);
  padding: 10px 20px;
  display: inline-block;
  border-radius: 3px;
  color: white;
  margin: 10px auto 30px;
}
.btn-a:hover {
  background-color: rgb(0, 181, 229);
}
.fa {
  color: #777;
  font-size: 20px;
  margin: 5px 0px;
  padding: 5px;
}
.fa:hover {
  color: rgb(230, 22, 45);
  border-radius: 50%;
  /* border: 1px solid rgb(217,0,19); */
  padding: 5px;
}
</style>
