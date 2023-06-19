<template>
     <div class="ato-content clearfix">
            <el-card>
                 <template #header>
                    <div class = "card-header" style="margin-bottom:0px;">
                        <span class="image-font" style="font-size:20px; margin: 0 auto">客户信息</span>
                        <div>
                            <el-button type="success" @click="dialogVisible = true">新增用户</el-button>
                            <el-dialog v-model="dialogVisible" title="编辑信息">
                              <el-row :gutter="20" class="dialog_row" style="padding-top: 0px">
                                <el-col :span="1"></el-col>
                                <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center">姓名</span></el-col>
                                <el-col :span="14"><el-input v-model="add_name" /></el-col>
                              </el-row>
                              <el-row :gutter="20" class="dialog_row">
                                <el-col :span="1"></el-col>
                                <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center">电话</span></el-col>
                                <el-col :span="14"><el-input v-model="add_phone" /></el-col>
                              </el-row>
                              <el-row :gutter="20" class="dialog_row">
                                <el-col :span="1"></el-col>
                                <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center">公司名称</span></el-col>
                                <el-col :span="14"><el-input v-model="add_company" /></el-col>
                              </el-row>

                              <el-row :gutter="20" class="dialog_row">
                                <el-col :span="1"></el-col>
                                <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center">法人名称</span></el-col>
                                <el-col :span="14"><el-input v-model="add_legal" /></el-col>
                              </el-row>
                              <el-row :gutter="20" class="dialog_row">
                                <el-col :span="8"></el-col>
                                <el-col :span="4" style="display: flex"><el-button type="primary" style="margin: 0 auto" size="large" @click="dialogVisible = false">取消</el-button></el-col>
                                <el-col :span="4" style="display: flex"><el-button type="primary" style="margin: 0 auto" size="large" @click="handleAddClient()">确认</el-button></el-col>
                              </el-row>
                            </el-dialog>
                        </div>
                    </div>
                </template>
            <div class="ato-list">
              <el-table :data="filterClients" :border="false" style="width: 100%; " :row-style="{ height: '100px'}" >
                <el-table-column type="expand" align="center">
                  <template #default="props">
                      <el-row :gutter="20" style="padding-left: 200px">
                        <el-col :span="10" style="text-align: left"><h3 class="expand_text">租赁信息</h3></el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="8" style="display: flex"><el-button size="big" style="align-self:center; margin: 0 auto" @click="editLease(props.row)">编辑租赁信息</el-button></el-col>
                      </el-row>
                      <el-table :data="props.row.room" :border="true" >
                        <el-table-column label="房间号" prop="id" align="center" />
                        <el-table-column label="起始时间" prop="start_time" align="center">
                          <template #default="scope">
                            <span>{{scope.row.start_time}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="结束时间" prop="end_time" align="center">
                          <template #default="scope">
                            <span>{{scope.row.end_time}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="签约时间" prop="sign_time" align="center">
                          <template #default="scope">
                            <span>{{scope.row.sign_time}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                  </template>
                </el-table-column>
                <el-table-column type="index" align="center"/>
                <el-table-column label="姓名" prop="name" align="center"/>
                <el-table-column label="联系电话" prop="phone" align="center"/>
                <el-table-column label="公司名称" prop="company" align="center"/>
                <el-table-column label="法人名称" prop="legal_person" align="center"/>
                <el-table-column align="right">
                  <template #header>
                    <el-input v-model="search" size="big" placeholder="查询" />
                  </template>
                  <template #default="scope">
                    <el-button size="big" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="big"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-space>
                <div class="title">
                </div>
            </el-space>

            </el-card>
       <el-dialog v-model="show_dialog" :title='this.dialog_person.name+"的信息"'>
         <el-row :gutter="20" class="dialog_row" style="padding-top: 0px">
           <el-col :span="1"></el-col>
           <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center">姓名</span></el-col>
           <el-col :span="14"><el-input v-model="dialog_name" /></el-col>
         </el-row>
         <el-row :gutter="20" class="dialog_row">
           <el-col :span="1"></el-col>
           <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center">电话</span></el-col>
           <el-col :span="14"><el-input v-model="dialog_phone" /></el-col>
         </el-row>
         <el-row :gutter="20" class="dialog_row">
           <el-col :span="1"></el-col>
           <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center">公司名称</span></el-col>
           <el-col :span="14"><el-input v-model="dialog_company" /></el-col>
         </el-row>

         <el-row :gutter="20" class="dialog_row">
           <el-col :span="1"></el-col>
           <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center">法人名称</span></el-col>
           <el-col :span="14"><el-input v-model="dialog_legal" /></el-col>
         </el-row>
         <el-row :gutter="20" class="dialog_row">
           <el-col :span="8"></el-col>
           <el-col :span="4" style="display: flex"><el-button type="primary" style="margin: 0 auto" size="large" @click="dialogCancel()">取消</el-button></el-col>
           <el-col :span="4" style="display: flex"><el-button type="primary" style="margin: 0 auto" size="large" @click="dialogConfirm()">确认</el-button></el-col>
         </el-row>
       </el-dialog>
       <el-dialog v-model="show_lease_dialog" :title='this.lease_person.name+"的租赁信息"'>
         <div style="text-align: right;padding-bottom: 10px">
           <el-button type="primary" style="padding-bottom: 10px" @click="addNewRoom(this.lease_person)">添加信息</el-button>
         </div>
         <el-table :data="this.lease_person.room" :border="true">
           <el-table-column label="房间号" prop="id" align="center">
             <template #default="scope">
               <el-input type="text" v-model="scope.row.id" v-show="scope.row.is_edit" size="small"></el-input>
               <span v-show="!scope.row.is_edit">{{scope.row.id}}</span>
             </template>
           </el-table-column>
           <el-table-column label="起始时间" prop="start_time" align="center">
             <template #default="scope">
               <div v-show="scope.row.is_edit">
                 <el-date-picker
                     v-model="scope.row.start_time"
                     type="date"
                     value-format="YYYY-MM-DD"
                     size="small"
                 />
               </div>
                <span v-show="!scope.row.is_edit">{{scope.row.start_time}}</span>
             </template>
           </el-table-column>
           <el-table-column label="结束时间" prop="end_time" align="center">
             <template #default="scope">
               <div v-show="scope.row.is_edit">
                 <el-date-picker
                     v-model="scope.row.end_time"
                     type="date"
                     value-format="YYYY-MM-DD"
                     size="small"
                     class="time_picker"
                 />
               </div>
               <span v-show="!scope.row.is_edit">{{scope.row.end_time}}</span>
             </template>
           </el-table-column>
           <el-table-column label="签约时间" prop="sign_time" align="center">
             <template #default="scope">
               <div v-show="scope.row.is_edit">
                 <el-date-picker
                     v-model="scope.row.sign_time"
                     type="date"
                     value-format="YYYY-MM-DD"
                     size="small"
                     class="time_picker"
                 />
               </div>
               <span v-show="!scope.row.is_edit">{{scope.row.sign_time }}</span>
             </template>
           </el-table-column>
           <el-table-column label="操作" align="center" >
             <template #default="rooms">
             <el-button size="small" v-show="!rooms.row.is_edit" @click="rooms.row.is_edit=true">编辑</el-button>
             <el-button size="small" v-show="rooms.row.is_edit" @click="rooms.row.is_edit=false">保存</el-button>
             <el-button size="small" v-show="!rooms.row.is_edit" type="danger" @click="console.log(rooms.row)">删除</el-button>
             </template>
           </el-table-column>
         </el-table>
       </el-dialog>
     </div>
</template>

<script>
import {computed,ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { User } from '@element-plus/icons-vue'
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

export default {
  data(){
    return{
      Clients: [
        {
          id:1,
          name: 'Jack',
          phone: '123456789',
          company:'a公司',
          legal_person: 'Jane',
          room: [
            {
              id: '201',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '202',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '203',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
          ],
        },
        {
          id:1,
          name: 'Tom',
          phone: '123456789',
          company:'a公司',
          legal_person: 'Jane',
          room: [
            {
              id: '201',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '202',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '203',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
          ],
        },
        {
          id:1,
          name: 'Tom',
          phone: '123456789',
          company:'a公司',
          legal_person: 'Jane',
          room: [
            {
              id: '201',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '202',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '203',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
          ],
        },
        {
          id:1,
          name: 'Tom',
          phone: '123456789',
          company:'a公司',
          legal_person: 'Jane',
          room: [
            {
              id: '201',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '202',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '203',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
          ],
        },
        {
          id:1,
          name: 'Tom',
          phone: '123456789',
          company:'a公司',
          legal_person: 'Jane',
          room: [
            {
              id: '201',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '202',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
            {
              id: '203',
              start_time: '2002-09-10',
              end_time: '2005-09-10',
              sign_time: '2001-06-20',
              is_edit: false,
            },
          ],
        },
      ],
      dialogVisible:false,
      filterClients:[],
      parentBorder:false,
      childBorder:false,
      search:'',
      show_dialog: false,
      show_lease_dialog: false,
      dialog_person: {
        id: 1,
        name: 'Tom',
        phone: '123456789',
        company: 'a公司',
        legal_person: 'Jane',
        room:[]
      },
      add_name:'',
      add_company:'',
      add_phone:'',
      add_legal:'',
      dialog_company:'',
      dialog_phone:'',
      dialog_legal:'',
      lease_person:{
        id: 0,
        name: '',
        phone: '',
        company:'',
        legal_person: '',
        room: []
      },
    }
  },
  mounted() {
  },
  methods:{
    handleEdit(index,client){
      this.dialog_person = client
      this.dialog_name = client.name
      this.dialog_phone = client.phone
      this.dialog_company = client.company
      this.dialog_legal = client.legal_person
      this.show_dialog = true
    },
    handleDelete(){
      ElMessageBox.confirm(
          '确认删除该用户?',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        this.show_dialog = false
      }).catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          })
      })},
    dialogConfirm(){
      ElMessageBox.confirm(
          '确认修改?',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
        this.show_dialog = false
        // const that = this
        // this.$axios.post()
      }).catch(() => {

      })
    },
    handleAddClient() {
      const formData = {
        new_name: this.add_name,
        new_phone: this.add_phone,
        new_company: this.add_company,
        new_legal:this.add_legal
      }
      this.$axios({
        method: 'POST',
        url: '/addNewClient',
        data:JSON.stringify(formData)
      }).then(res => {
        if (res.data.status === 1) {
          ElMessage({
          type: 'success',
          message: '添加成功'
          })
          this.dialogVisible = false
        }
        else {
          ElMessage({
          type: 'fail',
          message: '添加失败'
          })
        }
      })
    },
    dialogCancel(){
      ElMessageBox.confirm(
          '取消修改?',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        this.show_dialog = false
      }).catch(() => {

      })
    },
    editLease(client){
      this.lease_person = client
      this.show_lease_dialog = true
    },
    addNewRoom(person){
      let newRoom = {
        id: '',
        start_time: '',
        end_time: '',
        sign_time: '',
        is_edit: true,
      }
      person.room.push(newRoom)
    },
    saveRoom(room){
      console.log(room)
    },
  },
  watch:{
    search(newValue){
      this.filterClients = computed(() =>
          this.Clients.filter(
              (data) =>
                  !newValue ||
                  data.name.toLowerCase().includes(newValue.toLowerCase())
          ))
    },
    Clients(newValue){
      this.filterClients = newValue
    }
  },
  created() {
    const that = this
    this.parentBorder = ref(false)
    this.childBorder = ref(false)
    this.search = ref('')
    this.filterClients = this.Clients
    this.$axios({
      method:'POST',
      url:'/get_client_info',
    }).then(res => {
      that.Clients = res.data.clients
    })
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.expand_text {
  padding: 20px;
}
.ato-list {
  width: 100%;
  /*min-height: 1000px;*/
}
.dialog_row {
  padding: 10px;
}
</style>