<template>
    <div>
        <el-card>
            <el-form :inline="true" ref="add_data" :model="search_data">
                <el-form-item label="房号：">
                    <el-input prefix-icon="el-icon-search" v-model="search_data.search_roomid" clearable></el-input>
                </el-form-item>
                <el-form-item label="用户号：">
                    <el-input prefix-icon="el-icon-search" v-model="search_data.search_userid" clearable></el-input>
                </el-form-item>
                <el-form-item class="btnSearch">
                    <el-button type="primary" size="small"  @click="handleSearch()">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="table-area">
            <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column 
            type="index"
            label="#">
            </el-table-column>
            <el-table-column
                prop="feedbackid"
                label="反馈号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="userid"
                label="用户号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="roomid"
                label="房间号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="140">
            </el-table-column>
            <el-table-column
                prop="date"
                label="发起时间"
                width="200">
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
            <el-tab-pane label="用户描述">
                <el-card class="myCommit">
                    <div>描述: {{data4Dlg.description}}</div>
                </el-card>
                <el-card class="picture">
                    <div>图片: </div>
                     <!-- <img src="http://81.70.132.82:8000/static/media/room/2.jpg" alt="" width="50%" style="float:right"> -->
                </el-card>
                <el-card style="margin-top: 15px">
                <div>回复用户: </div>
                    <el-input class="input2"
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容..."
                    v-model="input2">
                    </el-input>
                    <el-button 
                        class="submit" size="small"
                        @click="submitInput(data4Dlg.type, input2, data4Dlg.feedbackid)">
                        提 交
                        <el-icon><Upload /></el-icon>
                    </el-button>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="处理反馈">
                <el-card style="margin-bottom: 10px">
                    <span class="demonstration">联系师傅处理: </span>
                    <el-button size="small" round
                    icon="el-icon-s-custom" @click="callWorkers(data4Dlg.feedbackid)">分派维修人员</el-button>
                </el-card>
                <el-card class="input-card">
                    <div>回复用户: </div>
                    <el-input class="input1"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容: 必须包括维修师傅姓名、联系方式以及维修时间"
                    v-model="input1">
                    </el-input>
                    <el-button 
                        class="submit" size="small" 
                        @click="submitInput(data4Dlg.type, input1, data4Dlg.feedbackid)">
                        生成初步反馈意见
                        <el-icon><Promotion /></el-icon>
                    </el-button>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="addDialogVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="addDialogVisible = false">确定</el-button>       
        </span>
        </el-dialog>
    </div>
    </template>
    
    <script>
    import axios from 'axios'
    import { data4Test } from './test.js';
    export default {
        name: "FeedbackTable",
        props: {
            params: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                count: 0,
                tableData: [],
                selected_table_data: [], 
                all_table_data: [],
                //筛选条件数据
                search_data:{
                    search_roomid:'',
                    search_userid:''
                },
                //format_status_list:['全部','已处理','未处理'],
                // 分页属性
                paginations: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 0, // 1页显示多少条
                    page_sizes: [1, 2, 3, 4, 6], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                },
                addDialogVisible: true,
                data4Dlg:{
                    feedbackid: 0,
                    userid: 0,
                    roomid: 0,
                    description: '',
                    date: '',
                    type: 1,
                    status: '',
                    reply: '',
                    star: null,
                },
                workerName: '',
                input1: '',
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
            async getFeedbackList() {
                //console.log(this.params);
                try {
                    const res = await axios.post('feedback/feedbackListByAdmin/', {type: this.params.type});
                    if(res.status !== 200) {
                        this.$message.error('获取用户反馈失败：'+ res.statusText);
                        return;
                    }
                    this.tableData = res.data.feedback;
                    for(let i = 0; i < this.tableData.length; i++) 
                        this.tableData[i].status = '未处理'
                } catch(err) {
                    //this.$message.error('发生未知错误，请重试');
                    //console.log(err);
                }
                this.tableData = data4Test.feedbackList;
                this.count = this.tableData.length;
                //初始化分页表信息
                this.paginations.total = this.tableData.length;
                this.paginations.page_size = this.tableData.length;
            },
            handleCurrentChange(page) {
                if(this.all_table_data.length === 0) {
                    this.all_table_data = this.tableData;
                }
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
                if(this.all_table_data.length === 0) {
                    this.all_table_data = this.tableData;
                }
                // 总页数
                this.paginations.total = this.all_table_data.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
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
                    roomid: this.search_data.search_roomid,  
                    userid: this.search_data.search_userid             
                }
                for(let item of this.all_table_data) {
                    if((pojo.roomid === '' || item.roomid === pojo.roomid) &&
                    (pojo.userid === '' || item.userid === pojo.userid)) {
                        this.selected_table_data.push(item);
                    }
                }
                this.tableData = this.selected_table_data;
                this.paginations.total = this.tableData.length;
                this.paginations.page_size = this.tableData.length;
            },
            async checkOperator(row) {
                //let feedbackid = row.feedbackid
                console.log(row);
                this.addDialogVisible = true
                // try {
                //     this.addDialogVisible = true
                //     const res = await axios.post('feedback/feedbackInfo/', {feedbackid: feedbackid});
                //     console.log(res);
                //     if(res.status !== 200) {
                //         this.$message.error('获取信息失败：'+ res.statusText);
                //         return;
                //     } 
                //     this.data4Dlg = res.data;
                // } catch(err) {
                //     this.$message.error('发生未知错误,请重试!' + err);
                //     console.log(err);
                // }
            },
            async callWorkers(feedbackid) {
                const res = await axios.get('feedback/sendWorker/', {params: {feedbackid: feedbackid}});
                console.log(res);
                //this.message.error('联系失败，请稍后再试');
                this.workerName = data4Test.workerName;
                this.input1 = '已为您联系到' + this.workerName + '师傅';
                console.log(this.input1);
                return;
               
            },
            async submitInput(type, input, feedbackid) {
                if(input === '') {
                    this.$message("请输入内容");
                }
                const res = await axios.post('feedback/reply/', {feedbackid: feedbackid, reply: input});
                if(res.status !== 200) {
                    this.$message.error('建立工单失败：'+ res.statusText);
                    return;
                } 
                //更新表单
                this.getFeedbackList(); 
                this.input1 = '';
                this.input2 = '';
            },
        }
    }
    </script>
    
    <style scoped>
    .table-area {
        margin-top: 7px;
        background-color: rgb(245, 244, 246) !important;
        box-shadow: 0 1px 1px rgb(0, 0, 0, 0.15) !important;
    }
    .el-pagination {
        margin-top: 5px;
    }
    
    .picture {
        margin-top: 15px;
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