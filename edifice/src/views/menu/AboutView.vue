<template>
  <div>
    <div class="grid">

		<figure class="effect-jazz">

			<img class="effect-image" src="@/assets/about.jpg" alt="img25">

            <figcaption>

				<h2><span>关于我们</span></h2>

				<p>希望能成为你忙碌日常中彼此陪伴的半个家人</p>


			</figcaption>

		</figure>

	</div>

    <el-card class="card-margin" style="margin-bottom:50px;">
        <template #header>
            <div slot="header" class="card-header">
                <p>
                关于
                </p>
            </div>
        </template>
        <div style="margin-top:10px;font-size:14px;line-height:20px;" text-align=left float=left>
                                <p>
                                我们是致力于给用户以最好的使用体验以及最优质的开发团队<br/>
                                希望能通过我们的努力来给您带来最优质的服务，让现在社会存在的租房问题得到解决<br/>
                                以下为开发人员团队（排名为字典序，不分先后）<br/>
                                金伟霖 王子翔 王振阳 张旭 张蕴韬 
                                </p>
        </div>
    </el-card>

    

  </div>
</template>

<script>

export default {
  data(){
    return{

    }
  },
  mounted() {

  },
  methods:{
    changeSee(){
        this.ifSee=true;
    },
    submit(){
        this.id++;
        this.names.push(this.id);
        this.info.push(this.textarea);
        this.starValue.push(this.value2);
        this.ifSee=false;
    }
  }


}
</script>

