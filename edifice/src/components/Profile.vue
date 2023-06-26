<template>
  <section class="profile-section" id="profile">
    <!-- 简介 -->
    <div class="profile-container">
      <div class="left-area">
        <div class="bg-area">
          <a>
            <img src="@/assets/image/living-room.jpg" alt="" class="img-curry c-img-left"/>
          </a>

          <p>
            大城市中，很多公司是租赁大厦的房间作为办公场地。从大厦管理方来说，有效盘活大厦使用效率可以带来收益增加，因此拟开发自身的物业管理系统，以更好的实现大厦的利用。
          </p>
          <a>
            <i class="fa fa-weibo"></i
          ></a>
          <br />
          
        </div>
      </div>

      <div class="right-area">
        <div class="bg-area">
          <a
            ><img
              src="~@/assets/image/furniture.jpg"
              alt=""
              class="img-curry c-img-right"
          /></a>

          <p>
            大厦管理系统系统包括了客户、空间与人员管理功能，保障各项功能有条不紊地进行。此外，还有访客管理方便外部人员参观。维修知识库的建立让知识，与你分享。
          </p>
          <!-- 使用了图标库font-awesome -->
          <a

            ><i class="fa fa-weibo"></i
          ></a>
          <br />
          
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
  padding: 50px 15px 50px 10px;
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
  height: 500px;
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
  height: 500px;
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
