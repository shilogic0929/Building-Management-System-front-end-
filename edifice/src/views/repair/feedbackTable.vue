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
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="user_id"
            label="用户号"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="room_id"
            label="房间号"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="150"
            align="center">
        </el-table-column>
        <el-table-column
            prop="type"
            label="报修类型"
            width="100"
            align="center">
        </el-table-column>
        <el-table-column
            prop="repair_time"
            label="发起时间"
            width="200"
            align="center">
        </el-table-column>
        <el-table-column
            prop="expect_time"
            label="期望时间"
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
    width="1000">
    <el-tabs type="border-card">
        <el-tab-pane label="处理反馈">
            <el-card class="myCommit" style="margin-bottom: 10px">
                <div>用户描述: {{data4Dlg.description}}</div>
            </el-card>
            <el-card class="input-card">
                <span class="demonstration">联系维修人员处理: </span>
                <el-button size="small" round
                @click="callWorkers(data4Dlg.form_id)">
                <el-icon><PhoneFilled /></el-icon>手动分派维修人员</el-button>
                <el-button size="small" round
                @click="autoAllocate()">
                <el-icon><Guide /></el-icon>智能分派维修人员</el-button>
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
                        <span class="demonstration_time">选择维修日期和时间段：</span>
                        <el-date-picker
                            v-model="input1.maintain_date"
                            type="date"
                            placeholder="选择日期"
                            :shortcuts="input1.shortcuts"
                            :size="size"
                        />
                        </div>
                        <div class="block">
                            <el-radio-group 
                                v-model="input1.maintain_period"
                                placeholder="选择日期">
                                <el-radio :label="'1'">08:00-10:00</el-radio>
                                <el-radio :label="'2'">10:00-12:00</el-radio>
                                <el-radio :label="'3'">14:00-16:00</el-radio>
                                <el-radio :label="'4'">16:00-18:00</el-radio>
                            </el-radio-group>
                        </div>
                    </el-form-item>
                </el-form>
                <el-divider content-position="center">工单处理流程</el-divider>
                <el-row>
                <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
                <el-col :span="8">
                    <div class="block">
                        <el-timeline>
                            <el-timeline-item
                                max-width="300px"
                                v-for="(activity, index) in activities"
                                :key="index"
                                :icon="activity.icon"
                                :type="activity.type"
                                :color="activity.color"
                                :hollow="activity.hollow"
                                :timestamp="activity.timestamp"
                                >
                            {{ activity.content }}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-col>
                <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
                </el-row>
            </el-card>
        </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
        <el-button 
            class="submit" size="middle" 
            @click="submitInput(data4Dlg, input1)">
            生成初步反馈意见
            <el-icon><Promotion /></el-icon>
        </el-button>
    </span>
    </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import { data4Test } from './test.js';
import myCharts from "./myCharts.vue";
import { option } from './options.js'
import { MoreFilled } from '@element-plus/icons-vue'
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
                form_id: 0,
                user_id: 0,
                room_id: 0,
                description: '',
                repair_time: '',
                expect_time: '2023-06-31 10:00:00',
                type: 1,
                status: 0,
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
                maintain_period: '',
                maintain_date: '',
                shortcuts: [{
                        text: '今天',
                        value: new Date(),
                    }, {
                        text: '明天',
                        value: () => {
                            const date = new Date()
                            date.setTime(date.getTime() + 3600 * 1000 * 24)
                            return date
                        },
                    }, {
                        text: '一周后',
                        value: () => {
                            const date = new Date()
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                            return date
                        },
                    },
                ],
                // disabledDate:  (time: Date) => {
                //     return time.getTime() > Date.now()
                // },
            },
            input2: '',
            activities: [{
                content: '用户发起报修',
                timestamp: '',
                type: 'primary',
                icon: MoreFilled,
                color: '#0bbd87',
                hollow: false,
            },{
                content: '用户预期维修时间',
                timestamp: '#0bbd87',
                type: 'primary',
                hollow: false,
            }, {
                content: '分派维修人员',
                timestamp: '',
                color: '',
                type: 'primary',
                hollow: true,
            }, {
                content: '上门维修时间',
                timestamp: '',
                type: 'primary',
                hollow: true,
            },],
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
            console.log(this.params)
            const formData = new FormData()
            formData.append('token', localStorage.getItem('token'))
            this.$axios({
                method:'POST',
                url: '/repairList',
                data: formData
            }).then((res)=>{
                console.log(res)
                if(res.status == 200) {
                    this.tableData = res.data.data;
                    if(this.tableData.length == 0) 
                        this.tableData = data4Test.feedbackList
                    this.getOption();
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
                this.data4Dlg = JSON.parse(tmp);
                console.log(this.data4Dlg);
                this.input1.maintainer_id = this.params.maintainer_id;
                this.input1.maintainer_name = this.params.maintainer_name;
                this.input1.maintainer_phone = this.params.maintainer_phone;
                this.activities[0].timestamp = this.data4Dlg.repair_time;
                this.activities[1].timestamp = this.data4Dlg.expect_time;
                const date = new Date()
                let day = date.toLocaleDateString()
                let time = date.toLocaleTimeString()
                let dateTime = day.split("/").join("-")+' '+ time
                this.activities[2].timestamp = dateTime;
                this.activities[2].hollow = false;
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
            this.paginations.page_size = Math.min(10, this.all_table_data.length);
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
            //console.log(this.selected_table_data)
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
            this.data4Dlg.repair_time = row.repair_time;
            this.data4Dlg.expect_time = row.expect_time;
            this.data4Dlg.type = row.type;
            this.activities[0].timestamp = row.repair_time;
            this.activities[1].timestamp = row.expect_time;
            console.log(row);
            this.addDialogVisible = true
        },
        callWorkers(form_id) {
            console.log(form_id); 
            localStorage.setItem('data4Dlg', JSON.stringify(this.data4Dlg));
            this.$router.push({
                name: '工人信息', 
                // params: {
                //     form_id: form_id
                // } 
            })
        },
        autoAllocate() {
            console.log(this.data4Dlg);
            let period = '1';
            let hour = parseInt(this.data4Dlg.expect_time.slice(11, 13));
            console.log(hour)
            period = hour < 10 ? '1' : (hour < 12 ? '2' : (hour < 16 ? '3' : '4'))
            const formData = new FormData();
            formData.append('token', localStorage.getItem('token'))
            //console.log(localStorage.getItem('token'));
            //formData.append('type', this.data4Dlg.type.toString());
            formData.append('type', '1');
            //formData.append('period', period)
            formData.append('period', '1')
            //formData.append('maintain_time', this.data4Dlg.repair_time.slice(0, 10))
            formData.append('maintain_time', '2023-06-24')
            console.log(this.data4Dlg.type.toString())
            console.log(period);
            console.log(this.data4Dlg.repair_time.slice(0, 10));
            this.$axios({
                method: 'POST',
                url: '/autoDeliver',
                date: formData
            }).then(res => {
                console.log(res)
                if(res.status !== 200 || res.data.errno == 1004 || res.data.errno == 1002) {
                    this.$message.error("该时段无空闲维修工，请手动分配")
                }
                else {
                    console.log(res)
                    this.$message.success("成功!")
                    this.input1.maintainer_name = res.data.data.maintainer_name
                    this.input1.maintainer_id = res.data.data.maintainer_id
                    this.input1.maintainer_phone = res.data.data.maintainer_phone
                    this.input1.maintain_date = new Date(res.data.data).toLocaleDateString
                    hour = new Date(res.data.data).getHours();
                    this.input1.maintain_period = hour < 10 ? '1' : (hour < 12 ? '2' : (hour < 16 ? '3' : '4'))
                    const date = new Date()
                    let day = date.toLocaleDateString()
                    let time = date.toLocaleTimeString()
                    let dateTime = day.split("/").join("-")+' '+ time
                    this.activities[2].timestamp = dateTime;
                    this.activities[2].hollow = false;

                    this.activities[3].timestamp = new Date(res.data.data).toLocaleDateString.split("/").join("-") + ' ' + 
                     new Date(res.data.data).toLocaleTimeString;
                    this.activities[3].hollow = false;
                }
            })
        },
        submitInput(data4Dlg, input) {
            console.log(this.data4Dlg.form_id);
            if(this.input1.maintainer_id === '') {
                this.$message("请输入内容")
                return
            }
            if(this.input1.maintain_date === '' || this.input1.maintain_period === '') {
                this.$message("请设置维修时间")
                return
            }
            if(this.data4Dlg.form_id == undefined) {
                this.$message("当前数据无效，请重新选择")
                this.addDialogVisible = false
                return
            }
            let date = new Date(this.input1.maintain_date).toLocaleDateString()
            //let time=new Date(input.maintain_time).toLocaleTimeString()
            // let dateTime = date + ' ' + time
            //let dateTime = date.split("/").join("-")+' '+ time
            let mp = new Map();
            mp.set('1', '08:00-10:00')
            mp.set('2', '10:00-12:00')
            mp.set('3', '14:00-16:00')
            mp.set('4', '16:00-18:00')
            date = date.split("/").join("-")
            console.log(date)
            console.log(this.data4Dlg)
            //this.activities[2].timestamp = date + ' ' + mp[this.input1.maintain_period]
            //console.log(dateTime);
            const formData = new FormData()
            formData.append('form_id', this.data4Dlg.form_id)
            formData.append('token', localStorage.getItem('token'))
            formData.append('maintain_date',date)
            formData.append('maintain_period', this.input1.maintain_period)
            formData.append('maintainer_name',this.input1.maintainer_name)
            formData.append('maintainer_id',this.input1.maintainer_id)
            formData.append('maintainer_phone',this.input1.maintainer_phone)
            //console.log(this.input1.maintain_period)
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
                //localStorage.removeItem('data4Dlg');
                this.input1.maintainer_id = ''
                this.input1.maintainer_name = ''
                this.input1.maintainer_phone = ''
                this.input1.maintain_period = ''
                this.input1.maintain_date = ''
                this.activities[2].hollow = true;
                this.activities[2].timestamp = ''
            }})
        },
        closeDlg() {
            this.input1.maintainer_id = '';
            this.input1.maintainer_name = '';
            this.input1.maintainer_phone = '';
            this.input1.maintain_date = '';
            this.input1.maintain_period = ''
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
.block {
  margin-top: 20px;
}
</style>