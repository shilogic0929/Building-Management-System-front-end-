<template>
     <div class="ato-content clearfix">
            <el-card>
                 <template #header>
                    <div class = "card-header" style="margin-bottom:0px;">
                        <span class="image-font" style="font-size:20px;">查看合同</span>
                        <div>
                        <!-- <el-button type="text" @click="visible=true">上传合同</el-button> -->
                        
                        </div>
                    </div>
                </template>

            <!-- <div class="ato-title-part">
                <div class="ato-title">
                    <h2>
                        查看合同
                        <el-button type="primary" style="margin-left:10px;margin-top:20px;">上传合同</el-button>
                    </h2>
                </div>  
            </div> -->

            <div class="ato-list">
                
                <ul>
                    <div v-for="(item, index) in contract" :key="index">
                    <li v-if="(index<numOrders*curPage)&&(index>=numOrders*(curPage-1))">
                        <div>
                            <img src="@/assets/ct.jpg" alt="" class="ato-logo001">
                        </div>
                        <h3>{{item.name}}</h3>
                        <p>租房价格: <span style="color:black;">{{item.price}}</span> 元</p>
                        <p>开始时间: <span style="color:black;">{{item.startTime}}</span> 日</p>
                        <p>租房时间: <span style="color:black;">{{item.period}}</span> 天</p>
                        <a @click.prevent="seeMore(item.ctid)" class="ato-more">查看详情</a>
                    </li>
                    </div>
                    
                </ul>
            </div>

            <div></div>
            <el-space>
                <div class="title">
                    <el-pagination :model="contract" background layout="prev, pager, next" :total="100" @current-change="changeCurPage"/>
                </div>
            </el-space>

            </el-card>

            <el-dialog v-model="visible" title="上传合同" width="50%">
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽到这里 <em>或者点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                    只能上传pdf版合同
                    </div>
                </template>
                </el-upload> 
                <span slot="footer" >
                    <el-button type="primary" @click="onSubmit()">确定</el-button>
                    <el-button @click="visible = false">取消</el-button>
                </span>   
            </el-dialog>


        </div>
</template>

<script>




export default {
  data(){
    return{
        visible:false,
        bscroll:null, 
        curPage:1,
        numOrders:6,
        contract:[]
    }
  },
  mounted() {
      this.init();
  },
  methods:{
    init(){
        var that=this;
        var data={order:"search_contracts"};
        this.$axios.post('/contract/search_contracts/',JSON.stringify(data)).then(function (request) {
            console.log(request.data.content)
            that.contract=request.data.content;
        })
    },
    seeMore(id){
        console.log("hello");
        this.$router.push({
          name: '合同信息',
          params: {
            ctid: id
          }
        })
    },
    Onsubmit(){
        this.visible = false;
    },
    changeCurPage (newVal){
        this.curPage = newVal;
    },
  }
  

}
</script> 