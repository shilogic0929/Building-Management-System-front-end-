<template>
  <div class="divpadding">
    <div class="desLeft">
    <el-card >
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;">房间信息</span>
                <el-button type="primary" @click="returnBefore()">返回</el-button>
            </div>
      </template>
      
    <el-descriptions :column="1" :size="large" border>
    
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            房间名称
          </div>
        </template>
        {{name}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"><House /></el-icon>
            房间大小
          </div>
        </template>
        {{size}}
      </el-descriptions-item>
      
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Wallet />
            </el-icon>
            价格(/每月)
          </div>
        </template>
        <span style="font-size:17px;color:red;font-weight:bold;">{{price}}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            房东电话
          </div>
        </template>
        {{telephone}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location />
            </el-icon>
              城市
          </div>
        </template>
        {{city}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            标签
          </div>
        </template>
        <el-tag class="tag" size="small">大平层</el-tag>
        <el-tag class="tag" size="small">学区房</el-tag>
        <el-tag class="tag" size="small">停车场</el-tag>
        <el-tag class="tag" size="small">地铁站</el-tag>
        <el-tag class="tag" size="small">购物中心</el-tag>
        <el-tag class="tag" size="small">五居室</el-tag>
      </el-descriptions-item>

      
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            地址
          </div>
        </template>
        {{address}}
      </el-descriptions-item>
  </el-descriptions>

  </el-card>

  <el-card>
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;">房间描述</span>
            </div>
      </template>
      <div class = "card-description">{{desc}}</div>
  </el-card>
  </div>


  <div class="desRight">
    <el-card>
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;font-size:16px;">房东介绍</span>
            </div>
      </template>
      <div>
        <img class="tx" src="@/assets/image/头像1.jpg">
        <h2>金伟霖</h2>
        <div style="margin-top:5px;">
          <p>邮箱：{{email}}</p>
          <p>电话：{{telephone}}</p>
        </div>
      </div>
    </el-card>

    <el-card>
      <template #header>
            <div class = "card-header" style="margin-bottom:0px;">
                <span class="image-font" style="color:black;font-size:16px;">立即租房</span>
            </div>
      </template>
      <el-button type="primary" @click="goLongRent()">立即长租</el-button>
      <el-button type="primary" @click="goShortRent()">立即短租</el-button>
    </el-card>

  </div>

  </div>

</template>

<script>
export default {
  data(){
      return {
        id:0,
        name:"",
        size:"",
        price:"",
        telephone:"",
        city:"",
        address:"",
        email:"",
        desc:"有个词很合适，美轮美奂，这个词经常被乱用，正确的是用来形容建筑物之美，而且兼有高大和美丽的赞美之意 还可以用金碧辉煌，雕梁画栋 金碧辉煌、富丽堂皇 空中楼阁 青砖壁瓦 雕栏玉砌 琼楼玉宇 顶天立地 摩天大楼 高耸入云 气宇轩昂 杜牧的《阿房宫赋》有很好的描写，可以直接引用几句： 六王毕，四海一。蜀山兀，阿房出。覆压三百余里，隔离天日。骊山北构而西折，直走咸阳。二川溶溶，流入宫墙。五步一楼，十步一阁；廊腰缦回，檐牙高啄；各抱地势，钩心斗角。盘盘焉，囷囷焉，蜂房水涡，矗不知乎几千万落。长桥卧波，未云何龙？覆道行空，不霁何虹？高低冥迷，不知西东。歌台暖晌，春光融融；舞殿冷袖，风雨凄凄。一日之内，一宫之间，而气候不齐。",
      }  
    },
    mounted() {
      this.init()
      var data={rid:this.id};
      var that=this;
      this.$axios.post('/room/lookup_room/',JSON.stringify(data)).then(function (request) {
        var content=request.data.content;
        console.log(content)
        that.name=content.name;
        that.size=content.size;
        that.price=content.price;
        that.telephone=content.mobile;
        that.city=content.city;
        that.address=content.address;
        that.email=content.email;
        // that.managerName=content.managerName;
        // that.desc=content.desc;
      })

    },
    methods:{
      init() {
          this.id=this.$route.params.id;
          console.log(this.id);
      },
      returnBefore(){
          this.$router.go(-1);
      },
      goLongRent(){
        this.$router.push({
          name: '长租',
          params: {
            id: this.id
          }
        })
      },
      goShortRent(){
        this.$router.push({
          name: '短租',
          params: {
            id: this.id
          }
        })
      }
    },
}

</script>