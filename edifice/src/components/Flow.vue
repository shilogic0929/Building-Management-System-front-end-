<template>
  <div>
    <div id="carousel" class="carousel" @mouseover="isCarousel=true" @mouseout="isCarousel=false">
      <div class="carousel-inner">
        <transition name="carousel-animates"
                    enter-class="carousel-animate-enter"
                    leave-class="carousel-animate-leave"
                    :leave-active-class="leaveToClass">
            <div class="item" :key="active" >
                <img :src="carousel[active].image" class="flow-img" alt="">
            </div>
        </transition>
      </div>
      <ol class="carousel-indicators">
        <li @click="move(active>index?-1:1,index)" v-for="(item,index) in carousel" :key="index" :class="index===active?'item active':'item'">{{index+1}}</li>
      </ol>
      <a @click="move(-1)" class="left carousel-control">
        <el-icon><arrow-left-bold /></el-icon>
      </a>
      <a @click="move(1)" class="right carousel-control">
        <el-icon><arrow-right-bold /></el-icon>
      </a>
      <span class="carousel-center">查看房源</span>
    
    </div>

  </div>
</template>



<script>

export default {
  data(){
      return {
        carousel:[//轮播内容
          {
            image:require("@/assets/image/2.jpg"),
          },
          {
            image:require("@/assets/image/1.jpg"),
          },
          {
            image:require("@/assets/image/3.jpg"),
          },
        ],
        active:-1,//当前轮播图位置
        times:null,//定时器
        isCarousel:false,//是否鼠标移入暂停轮播
        leaveToClass:"",//轮播图片离开时的动画，不同方向，动画不同
        interval:5000,//每张图片的间隔空隙,
        
      }  
    },
    methods:{
      carouselAnimate() {//轮播动画
        if(!this.isCarousel){this.move(1);}//如果没有鼠标移入暂停轮播，则轮播下一张图
        setTimeout(this.carouselAnimate.bind(this),this.interval)
      },
      move(direction,index) {//direction为轮播方向，正数为右，负数为左。index为当前轮播图
        var num=this.active;
        num=index!==undefined?index:num+direction;
        num=num>=this.carousel.length?0:
        num<0?this.carousel.length-1:num;
        this.active=num;
        this.leaveToClass=direction>0?"carousel-animate-leave-to-left":"carousel-animate-leave-to-right";
      }
    },
    created() {//创建实例之后获取
      var images = [];
      for(var i =0; i< this.carousel.length;i++) {//预加载图片
        images[i] = new Image();
        images[i].src = this.carousel[i].image;
      }

      if(this.carousel===undefined||Object.prototype.toString.call(this.carousel)!=='[object Array]'){
        console.error("请正确设置您的轮播内容");
      }
      else if(this.carousel.length<1){
        console.warn("轮播图少于一张，无法轮播")
      }
      else {
        this.carouselAnimate();//开始轮播
      }
    },
    destroyed() {//销毁组件时清除定时器
      clearTimeout(this.times)
    },
    
}
</script>


