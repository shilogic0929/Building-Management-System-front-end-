<template>
  <div>

    <div class="desLeft" style="margin-top:20px;">
        <el-card>
            <template #header>
                <div class = "card-header" style="margin-bottom:0px;">
                    <span class="image-font">短租申请</span>
                    <!-- <el-button class="button" type="text" @click="this.$router.go(-1)">返回</el-button> -->
                </div>
            </template>
    
    
        <div class="margin-top" style="width:80%;">

            <el-form :model="form" label-width="120px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.telephone" />
                </el-form-item>
                
                <el-form-item label="租房时间">
                    <el-col :span="11">
                        <el-date-picker v-model="form.date1" type="date" placeholder="起始时间"  style="width: 100%"/>
                    </el-col>
                    <el-col :span="2" class="text-center">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="form.date2" type="date" placeholder="结束时间"  style="width: 100%"/>
                    </el-col>
                </el-form-item>
                     
               
                <el-form-item label="备注">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
                <el-form-item>
                    
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>

        </div>
        </el-card>
    </div>    
    
    <div class="desRight" style="margin-top:20px;">
        <el-card>
             <template #header>
                <div class = "card-header" style="margin-bottom:0px;">
                    <span class="image-font"  style="color:black;font-size:16px;">信息</span>
                </div>
            </template>
            <h2>房间大小:{{size}}</h2>
            <h2>房间价格:<span style="color:red;">{{price}}元</span>每月</h2>
        </el-card>

        <el-card>
             <template #header>
                <div class = "card-header" style="margin-bottom:0px;">
                    <span class="image-font"  style="color:black;font-size:16px;margin-bottom:10px;">标签</span>
                </div>
            </template>
            <div class="taglist">
                <ul>
                    <li class="taglistli"><el-icon class="icon-arrow"><CaretRight /></el-icon><a>学区房(2)</a></li>
                    <li class="taglistli"><el-icon class="icon-arrow"><CaretRight /></el-icon><a>地铁站(3)</a></li>
                    <li class="taglistli"><el-icon class="icon-arrow"><CaretRight /></el-icon><a>大平层(5)</a></li>
                    <li class="taglistli"><el-icon class="icon-arrow"><CaretRight /></el-icon><a>购物中心(6)</a></li>
                </ul>
            </div>
        </el-card>

        <el-card>
             <template #header>
                <div class = "card-header" style="margin-bottom:0px;">
                    <span class="image-font"  style="color:black;font-size:16px;margin-bottom:10px;">推荐房源</span>
                </div>
            </template>
                <div class="rentCarousel">
                    <el-carousel height="270px">
                        <el-carousel-item>
                            <img src="@/assets/image/h1.png">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="@/assets/image/h2.png">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="@/assets/image/h3.png">
                        </el-carousel-item>
                        <el-carousel-item>
                            <img src="@/assets/image/h4.png">
                        </el-carousel-item>
                    </el-carousel>
                </div>
        </el-card>
    </div>

  </div>

</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data(){
      return {
          id: "",
          form:{
            name:"",
            telephone:"",
            date1:"",
            date2:"",
            desc:"",
            type:"1",
          },
          price: "",
          size:"",
          address:"",
      }  
    },
    mounted() {
        this.init();
        
    },
    methods:{
      init() {
        this.id=this.$route.params.id;
        var data={rid:this.id};
        var that=this;
        this.$axios.post('/room/lookup_room/',JSON.stringify(data)).then(function (request) {
            var content=request.data.content;
            that.size=content.size;
            that.price=content.price;
            that.address=content.address;
        })
      },
      onSubmit(){
            var time=(this.form.date2-this.form.date1)/1000/60/60/24
            var f=this.form.date1;
            var d=this.form.date2;
            var data={
                username:this.$store.state.username,
                rid:this.id,
                rent:this.form.type,
                period:time,
                startTime:f.getFullYear() + "-"+ (f.getMonth() + 1) +"-"+ f.getDate(),
                endTime:d.getFullYear() + "-"+ (d.getMonth() + 1) +"-"+ d.getDate(),
                stat:0,
            }

            var that=this;
            this.$axios.post('/order/create_order/',JSON.stringify(data)).then(function (request) {
                console.log(request);
                if(request.data.errno==0){
                    ElMessage({
                      message: "提交成功，三秒钟后跳转到查看订单界面",
                      type: 'success',
                    }) 
            
                    setTimeout(()=>{
                        that.$router.push({
                            name: '查看订单',
                            params: {
                                
                            }
                        })
                    },3000)
                }
                else{ ElMessage.error("提交失败，请重新提交")}
            })
   
      },
      
    },
}

</script>