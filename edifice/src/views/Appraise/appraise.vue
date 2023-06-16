<template>
  <div>
    <div class="grid">

		<figure class="effect-jazz">

			<img class="effect-image" src="@/assets/house.jpg" alt="img25">

            <figcaption>

				<h2><span>租房评价系统</span></h2>

				<p>希望对我们的青年租房管理系统提出宝贵的意见</p>


			</figcaption>			

		</figure>

	</div>

    <el-card class="card-margin">
        <div slot="header" class="card-header">
            评价
            <el-button type="primary" @click="changeSee">添加评价</el-button>
        </div>    
        <el-collapse v-model="activeNames" >
            <div v-for="(item,index) in complaint" :key="index">
                <el-collapse-item class="el-collapse-title" :title="item" :name="index">
                    <template #title >
                        <div class="collapse-item">
                            <div class="collapse-item-title">
                            {{item.username}}
                            </div>
                            <div class="demo-rate-block">
                                <el-rate  disabled  v-model="item.starValue" :colors="colors" />
                            </div>
                        </div>
                    </template>
                    <div class="smalldiv">
                        {{item.info}}
                    </div>
                </el-collapse-item>
                <span></span>
            </div>
        </el-collapse>        
    </el-card>

    <el-card class="card-margin" v-if="ifSee">
        <div slot="header" class="card-header">
            添加评价
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
        <div class="pj-left">
            <el-input v-model="textarea" :rows="4" type="textarea" placeholder="在此处添加评论"/>
        </div>
        <div class="pj-right">
            <span class="demonstration">请给平台打分</span>
            <el-rate v-model="value2" :colors="colors" />
        </div>
    </el-card>

  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data(){
    return{
        id:0,
        value2:0,
        textarea:"",
        ifSee:false,
        activeNames:'',
        complaint:[],
        colors:['#99A9BF', '#F7BA2A', '#FF9900'],
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    init(){
        var that=this;
        var data={complaint:"complaint"} 
        this.$axios.post('/complaint/search_complaints/',JSON.stringify(data)).then(function (request) {
            console.log(request.data.content);
            that.complaint = request.data.content;
        })
    },
    changeSee(){
        this.ifSee=true;
    },
    submit(){
        this.id++;
        var data={
                username:this.$store.state.username,
                starValue:this.value2,
                info:this.textarea,
            }
        
        this.complaint.push(data);
        this.$axios.post('/complaint/submit_complaint/',JSON.stringify(data)).then(function (request) {
            console.log(request.data);
            if(request.data.errno==0){
                ElMessage({
                      message: request.data.msg,
                      type: 'success',
                    }) 
            }
            else{
                ElMessage.error(request.data.msg)
            }
        })
    
        this.ifSee=false;
    }
  }
  

}
</script>

