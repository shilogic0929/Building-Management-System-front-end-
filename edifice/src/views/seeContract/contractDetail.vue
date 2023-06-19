<template>
  <div>
    <div class="pdf-button">
      <el-space direction="vertical">
        <el-button  style="margin-left: 5px">上一页</el-button>
        <el-button  style="margin-left: 5px">下一页</el-button>
        <el-button type="primary" round style="margin-left: 5px">下载<el-icon style="margin-left: 2px"><Download /></el-icon></el-button>
      </el-space>
    </div>
    <el-space>
      <vue-pdf-embed class="vue-pdf-embed" :source="source" :width="800"  :page="pageNum" />
    </el-space>
  </div>
</template>


<script>
import VuePdfEmbed from "vue-pdf-embed";

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
  },
  computed: {

  },
  methods: {
  },
};

</script>

