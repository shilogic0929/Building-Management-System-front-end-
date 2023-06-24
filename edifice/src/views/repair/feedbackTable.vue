<template>
<div>
    <main>
        <div class="container">
            <el-card class="card" style="width: 1500px;">
                <myCharts id="chart" :options="option" :width="width"></myCharts>
            </el-card>
        </div>
    </main>
    <el-card>
        <el-form :inline="true" ref="add_data" :model="search_data">
            <el-form-item label="房号：">
                <el-input prefix-icon="el-icon-search" v-model="search_data.search_room_id" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户号：">
                <el-input prefix-icon="el-icon-search" v-model="search_data.search_user_id" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnSearch">
                <el-button type="primary" size="small"  @click="handleSearch()">筛选</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="table-area">
        <el-table 
        :data="tableData" 
        stripe style="width: 100%"
        :header-cell-style="{background:'#87CEFA'}"
        >
        <el-table-column 
        type="index"
        label="#"
        align="center">
        </el-table-column>
        <el-table-column
            prop="form_id"
            label="反馈号"
            width="150"
            align="center">
        </el-table-column>
        <el-table-column
            prop="user_id"
            label="用户号"
            width="150"
            align="center">
        </el-table-column>
        <el-table-column
            prop="room_id"
            label="房间号"
            width="150"
            align="center">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="150"
            align="center">
        </el-table-column>
        <el-table-column
            prop="repair_time"
            label="发起时间"
            width="200"
            align="center">
        </el-table-column>
        <el-table-column label="操作">
            <template v-slot="scope">
                <el-button round type="info" 
                size="small"
                @click="checkOperator(scope.row)">
                <el-icon style="padding-right: 5px;"><ChatSquare /></el-icon>
                查看明细</el-button>
            </template>
        </el-table-column>
        </el-table>
        <!--分页区-->
        <el-pagination
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
            :current-page.sync='paginations.page_index'
            @current-change='handleCurrentChange'
            @size-change='handleSizeChange'>
        </el-pagination>
    </el-card>
    <!--添加对话框,查看明细-->
    <el-dialog title="查看明细" v-model="addDialogVisible"
    width="80%">
    <el-tabs type="border-card">
        <el-tab-pane label="处理反馈">
            <el-card class="myCommit" style="margin-bottom: 10px">
                <div>用户描述: {{data4Dlg.description}}</div>
            </el-card>
            <el-card style="margin-bottom: 10px">
                <span class="demonstration">联系维修人员处理: </span>
                <el-button size="small" round
                @click="callWorkers(data4Dlg.form_id)">
                <el-icon><PhoneFilled /></el-icon>分派维修人员</el-button>
            </el-card>
            <el-card class="input-card">
                <div>回复用户: </div>
                <!-- <el-input class="input1"
                type="textarea"
                :rows="4"
                placeholder="请输入内容: 必须包括维修师傅姓名、联系方式以及维修时间"
                v-model="input1">
                </el-input> -->
                <div style="margin: 20px" />
                <el-form
                    :label-position="top"
                    label-width="200px"
                    :model="formLabelAlign"
                    style="max-width: 800px"
                >
                    <el-form-item label="维修人员姓名">
                    <el-input v-model="input1.maintainer_name" />
                    </el-form-item>
                    <el-form-item label="维修人员id">
                    <el-input v-model="input1.maintainer_id" />
                    </el-form-item>
                    <el-form-item label="维修人员电话">
                    <el-input v-model="input1.maintainer_phone" />
                    </el-form-item>
                    <el-form-item label="维修时间">
                        <div class="block">
                        <el-date-picker
                            v-model="input1.maintain_time"
                            type="datetime"
                            placeholder="选择日期和时间"
                        />
                        </div>
                    </el-form-item>
                </el-form>
                <el-button 
                    class="submit" size="small" 
                    @click="submitInput(data4Dlg, input1)">
                    生成初步反馈意见
                    <el-icon><Promotion /></el-icon>
                </el-button>
            </el-card>
        </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDlg()">取消</el-button>
        <el-button size="small" type="primary" @click="closeDlg()">确定</el-button>       
    </span>
    </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import { data4Test } from './test.js';
import myCharts from "./myCharts.vue";
import { option } from './options.js'
export default {
    name: "FeedbackTable",
    components: {
        myCharts,
    },
    props: {
        params: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            count: 0,
            option: option,
            tableData: [],
            selected_table_data: [], 
            all_table_data: [],
            //筛选条件数据
            search_data:{
                search_room_id:'',
                search_user_id:''
            },
            //format_status_list:['全部','已处理','未处理'],
            // 分页属性
            paginations: {
                page_index: 1, // 当前位于哪页
                total: 0, // 总数
                page_size: 0, // 1页显示多少条
                page_sizes: [1, 2, 5, 10], //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
            },
            addDialogVisible: false,
            data4Dlg:{
                form_id: '',
                user_id: '',
                room_id: '',
                description: '',
                date: '',
                type: 1,
                status: '',
                reply: {
                    // maintainer_id: '',
                    // maintainer_name: '',
                    // maintainer_phone: '',
                    // maintain_time: '',
                },
                star: null,
            },
            workerName: '',
            input1: {
                maintainer_id: '',
                maintainer_name: '',
                maintainer_phone: '',
                maintain_time: '',
            },
            input2: '',
        }
    },
    created() { 
        this.getFeedbackList(); 
    },
    updated() { 
        this.workName;
    },
    methods: {
        getFeedbackList() {
            //this.tableData = data4Test.feedbackList;
            const formData = new FormData()
            formData.append('token', localStorage.getItem('token'))
            this.$axios({
                method:'POST',
                url: '/repairList',
                data: formData
            }).then((res)=>{
                if(res.status == 200) {
                    this.tableData = res.data.data;
                    if(this.tableData==null) 
                        this.tableData = data4Test.feedbackList
                    this.getOption();
                    this.addDialogVisible = false;
                    this.paginations.page_size = 10;
                    this.setPaginations()
                    this.handleSizeChange(this.paginations.page_size)
                }
            })
            console.log(this.params)
            if(this.params != null && this.params.maintainer_name !== undefined && this.params.maintainer_name !== '' && localStorage.getItem('data4Dlg') !== null) {
                let tmp = localStorage.getItem('data4Dlg');
                console.log(tmp);
                // this.data4Dlg.form_id = tmp.form_id;
                // this.data4Dlg.user_id = tmp.user_id;
                // this.data4Dlg.description = tmp.description;
                // this.data4Dlg.date = tmp.date;
                // this.data4Dlg.status = tmp.status;
                // this.data4Dlg.room_id = tmp.room_id;
                this.data4Dlg = tmp;
                this.input1.maintainer_id = this.params.maintainer_id;
                this.input1.maintainer_name = this.params.maintainer_name;
                this.input1.maintainer_phone = this.params.maintainer_phone;
                this.addDialogVisible = true;
            }
        },
        getOption() {
            let mp1 = new Map(), sorted1;
            let mp2 = new Map(), sorted2;
            for(let i = 0; i < this.tableData.length; i++) {
                let str = this.tableData[i].repair_time;
                // 使用slice()方法截取前10个字符，即年月日部分
                let date = str.slice(0, 10);
                console.log(date)
                // 判断mp对象是否已经有该日期作为键，如果没有，就初始化为0
                if(!mp1.has(date)) 
                    mp1.set(date, 0);
                if(!mp2.has(date)) 
                    mp2.set(date, 0);
                if(this.tableData[i].status == 0 || this.tableData[i].status == 1) {
                    // 将mp对象中该日期对应的值加一
                    mp1.set(date, mp1.get(date) + 1);
                }
                else 
                    mp2.set(date, mp2.get(date) + 1);
            }
            // 在统计完日期出现次数后，再创建sorted对象，并将mp对象转换为一个排序后的数组
            sorted1 = new Map(Array.from(mp1).sort(([a], [b]) => a.localeCompare(b)));
            sorted2 = new Map(Array.from(mp2).sort(([a], [b]) => a.localeCompare(b)));
            // 将排序后的数组赋值给mp对象
            mp1 = sorted1;
            mp2 = sorted2;
            //console.log([...mp]); // 打印出排好序的键值对数组
            this.option.xAxis.data = [];
            // 使用push()方法将键值对添加到数组中
            for(let [key] of mp1) {
                this.option.xAxis.data.push(key);
            }
            this.option.series[0].data = [];
            this.option.series[1].data = [];
            for(let [key, value] of mp1) 
                this.option.series[0].data.push([key, value])
            for(let [key, value] of mp2) 
                this.option.series[1].data.push([key, value])
            //console.log([...this.option.series[0].data])
        },
        handleCurrentChange(page) {
            if(this.all_table_data.length === 0) {
                this.all_table_data = this.tableData;
            }
            this.paginations.page_index = page;
            // 当前页
            let sortnum = this.paginations.page_size * (page - 1);
            let table = this.all_table_data.filter((item, index) => {
                return index >= sortnum;
            });
            // 设置默认分页数据
            this.tableData = table.filter((item, index) => {
                return index < this.paginations.page_size;
            });
        },
        handleSizeChange(page_size) {
            if(this.all_table_data.length === 0) {
                this.all_table_data = this.tableData;
            }
            // 切换size
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.tableData = this.all_table_data.filter((item, index) => {
                return index < page_size;
            });
        },
        setPaginations() {
            // if(this.all_table_data.length === 0) {
                this.all_table_data = this.tableData;
            //}
            // 总页数
            this.paginations.total = this.all_table_data.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = this.all_table_data.length;
            // 设置默认分页数据
            this.tableData = this.all_table_data.filter((item, index) => {
                return index < this.paginations.page_size;
            });
        },
        //筛选
        handleSearch() {
            if(this.all_table_data.length === 0) {
                this.all_table_data = this.tableData;
            }
            let pojo;
            this.selected_table_data = [];
            pojo = {
                room_id: this.search_data.search_room_id,  
                user_id: this.search_data.search_user_id             
            }
            for(let item of this.all_table_data) {
                console.log(item)
                if((pojo.room_id === '' || item.room_id == pojo.room_id) &&
                (pojo.user_id === '' || item.user_id == pojo.user_id)) {
                    this.selected_table_data.push(item);
                }
            }
            console.log(this.selected_table_data)
            this.tableData = this.selected_table_data;
            this.paginations.total = this.tableData.length;
            this.paginations.page_size = 10;    
        },
        checkOperator(row) {
            this.data4Dlg.form_id = row.form_id;
            this.data4Dlg.user_id = row.user_id;
            this.data4Dlg.description = row.description;
            this.data4Dlg.room_id = row.room_id;
            this.data4Dlg.status = row.status;
            this.data4Dlg.date = row.date;
            console.log(row);
            this.addDialogVisible = true
        },
        callWorkers(form_id) {
            console.log(form_id); 
            localStorage.setItem('data4Dlg', JSON.stringify(this.data4Dlg));
            this.$router.push({
                name: '工人信息', 
                params: {
                    form_id: form_id
                } 
            })
        },
        submitInput(data4Dlg, input) {
            console.log(data4Dlg);
            this.data4Dlg = JSON.parse(data4Dlg);
            console.log(this.data4Dlg.form_id);
            if(input.maintainer_id === '') {
                this.$message("请输入内容")
                return
            }
            if(input.maintain_time === '') {
                this.$message("请设置维修时间")
                return
            }
            if(this.data4Dlg.form_id == undefined || this.data4Dlg.form_id == '') {
                this.$message("当前数据无效，请重新选择")
                this.addDialogVisible = false
                return
            }
            let date = new Date(input.maintain_time).toLocaleDateString()
            let time=new Date(input.maintain_time).toLocaleTimeString()
            // let dateTime = date + ' ' + time
            let dateTime = date.split("/").join("-")+' '+ time
            console.log(dateTime);
            const formData = new FormData()
            formData.append('form_id', this.data4Dlg.form_id)
            formData.append('token', localStorage.getItem('token'))
            formData.append('maintain_time',dateTime)
            formData.append('maintainer_name',input.maintainer_name)
            formData.append('maintainer_id',input.maintainer_id)
            formData.append('maintainer_phone',input.maintainer_phone)
            
            this.$axios({
                method:'POST',
                url: '/setMaintainer',
                data: formData
            }).then(res => {
                if(res.status !== 200) {
                this.$message.error('提交反馈失败：'+ res.statusText);
                return;
            } else {
                this.$message.success('成功')
                //更新表单
                this.getFeedbackList(); 
                this.addDialogVisible = false;
            }})
        },
        closeDlg() {
            this.input1.maintainer_id = '';
            this.input1.maintainer_name = '';
            this.input1.maintainer_phone = '';
            this.input1.maintain_time = '';
            this.addDialogVisible = false;
            localStorage.removeItem('data4Dlg');
        },
        tableHeaderCellStyle({row,column,rowIndex, columnIndex}) {
            let cellStyle1= "color: #fff;background:#027db4"
            let cellStyle2= "color: #fff;background:#70b603"
            let cellStyle3= "color: #fff;background:#00bfbf"
            if(columnIndex >= 0 && columnIndex < 9 && rowIndex===1){
            return cellStyle1;
            }
            if(columnIndex > 8 && columnIndex < 18 && rowIndex===1){
                return cellStyle2;
            }
            if(columnIndex === 18 && rowIndex===1){
            return cellStyle3;
            }
        },

    }
}
</script>

<style scoped>
/* 定义一个弹性容器 */
.container {
    display: flex;
    /* 设置容器内的项目沿主轴（水平方向）居中对齐 */
    justify-content: left;
    /* 设置容器内的项目沿交叉轴（垂直方向）居中对齐 */
    align-items: left;
}
.table-area {
    margin-top: 7px;
    background-color: rgb(245, 244, 246) !important;
    box-shadow: 0 1px 1px rgb(0, 0, 0, 0.15) !important;
}
.el-pagination {
    margin-top: 5px;
}
.input1 {
    margin-top: 10px !important;
}
.input2 {
    margin-top: 10px !important;
}
.submit {
    margin-top: 15px !important;
}
</style>