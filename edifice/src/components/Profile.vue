<template>
  <section class="profile-section" id="profile">
    <!-- 简介 -->
    <div class="profile-container">
      <div class="left-area">
        <div class="bg-area">
          <a href="#/seeHouse">
            <img src="@/assets/image/living-room.jpg" alt="" class="img-curry c-img-left"/>
          </a>
          <h3>问题需求</h3>
          <p>
            当下年轻人非常注重生活体验，对居住品质要求亦越来越高。近年长短租公寓品牌都推广“房子是租来的但生活不是”，各出奇招希望在年轻人的居住环节中加入独特的生活方式。
            在“如何更好地更便利地生活”的问题中，我们小组开发出的新一代青年租房系统给出了我们的答案。
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
          <h3>设计理念</h3>
          <p>
            青年租房系统汇集了真诚、快乐、分享、奉献等社会生活急需的正能量元素，我们致力于整合有创意的租住方式、多元化的青年人群、互补性的创业资源，塑造一个有趣、信任、开放的社区生态，并通过共享经济和社群经济影响一代青年人的价值观，让生活于此的都市青年找到灵魂休息的温暖港湾。
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
