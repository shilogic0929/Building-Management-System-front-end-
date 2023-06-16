<template>
  <div>
    <div class="pdf-button">
      <el-space direction="vertical">
        <el-button @click="prev()" style="margin-left: 5px">上一页</el-button>
        <el-button @click="next()" style="margin-left: 5px">下一页</el-button>
        <el-button type="primary" round style="margin-left: 5px" @click="download">下载<el-icon style="margin-left: 2px"><Download /></el-icon></el-button>
      </el-space>
    </div>
    <el-space>
      <vue-pdf-embed class="vue-pdf-embed" :source="source" :width="800"  :page="pageNum" />
    </el-space> 
  
   
      
  </div>
</template>


<script>
import { ElMessage } from 'element-plus'
import VuePdfEmbed from "vue-pdf-embed";
const PDF = require('pdfjs-dist')
// 页面报错解决，在将 pdfjs-dist/build/pdf.worker.js 复制一份放到项目 public 目录下后引入
PDF.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')
// 引入文件

export default {
  components: {
    VuePdfEmbed,
   
  },
  data() {
    return {
      ctid:0,
      pdfDoc:"",
      source: "", // 文件路径
      pageNum: 1, // 当前页数
      scale: 1,  // 缩放比例
      numPages: 0, // 总页数
      filename:"",
    };
  },
  mounted() {
    this.ctid=this.$route.params.ctid;
    this.init();
    // 获取总页数
    this.getPdfNumPages()
    window.onresize = () => {
        location. reload();
        } 
  },
  computed: {
    // eslint-disable-next-line no-unused-vars
    scaleFun(index) { // 缩放
     var scale = this.scale;
    
        return `transform:scale(${scale})`;
      
    
    },
  },
  methods: {
    init(){
      let objectUrl;
      var data={ctid:this.ctid};
      var that=this;
        this.$axios.post('/contract/get_pdf/',JSON.stringify(data),{responseType:"blob"}).then(function (request) {
            console.log(request);
            if(request.data.errno!=0&&request.data.errno!=undefined){
                ElMessage.error("合同不存在");
            }

            if(request.headers["content-disposition"] != undefined) {
                let filename = decodeURI(
                    request.headers["content-disposition"].split("filename=")[1]
                );
                filename = filename.split(".")[0];
                filename = filename.split('"')[1];
                console.log(filename);
                that.filename = filename;
                try {
                    let blob = new Blob([request.data], {
                        type: `application/pdf;charset-UTF-8`, //word文档为msword,pdf文档为pdf
                    });
                    objectUrl = URL.createObjectURL(blob);
                } catch (err) {
                    console.log(err);
                    alert("数据请求失败！");
                }             
                console.log(objectUrl);
                that.source = objectUrl;
            } 
        })
    },
     getPdfNumPages() {
      
      const url = this.source
      // eslint-disable-next-line no-undef
      
      const loadingTask = PDF.getDocument(url)
      loadingTask.promise.then(pdf => {
        this.pdfDoc=pdf;
        this.numPages = this.pdfDoc.numPages;
      })
    },
    prev() {
      if (this.pageNum > 1) {
        this.pageNum -= 1;
      }
    },
    next() {
      
      if (this.pageNum < this.numPages) {
        this.pageNum += 1;
      }
    },
    zoomA() {
      this.scale += 0.1;
    },
    zoomB() {
      this.scale -= 0.1;
    },
    download() {
      let link = document.createElement("a");
      link.href = this.source;
      link.setAttribute("download", this.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
};

</script>

