<template>
  <div class="ato-content clearfix">
    <el-dialog v-model="dialogVisibleforpayment" title="编辑信息">
      <div style="margin-left: 120px;">
        <el-row :gutter="20" class="dialog_row" style="padding-top: 0px" >
          <el-col :span="1"></el-col>
          <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center;font-size: medium;">年份</span></el-col>
          <el-date-picker
            v-model="year_picked"
            type="year"
            placeholder="请选择年份"
            value-format="YYYY"
          />
        </el-row>
        <el-row :gutter="20" class="dialog_row">
          <el-col :span="1"></el-col>
          <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center;font-size: medium;">缴纳状态</span></el-col>
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio label="1" size="large">已缴纳</el-radio>
            <el-radio label="2" size="large">未缴纳</el-radio>
          </el-radio-group>
        </el-row>
        <el-row :gutter="20" class="dialog_row">
          <el-col :span="1"></el-col>
          <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center;font-size: medium;">缴纳时间</span></el-col>
          <el-date-picker
          v-model="day_picked"
          type="date"
          placeholder="请选择日期"
          :size="default"
          :disabled="radio1 == 2 ? true : false"
          value-format="YYYY-MM-DD"
        />
        </el-row>
        <el-row :gutter="20" class="dialog_row">
          <el-col :span="4"></el-col>
          <el-col :span="4" style="display: flex"><el-button type="primary" size="large" @click="dialogVisible = false">取消</el-button></el-col>
          <el-col :span="8" style="display: flex"><el-button type="primary" size="large" @click="handleAddPayment()">确认</el-button></el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog v-model="dialog_for_change" title="修改信息">
      <div style="margin-left: 120px;">
        <el-row :gutter="20" class="dialog_row" style="padding-top: 0px" >
          <el-col :span="1"></el-col>
          <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center;font-size: medium;">年份</span></el-col>
          <el-date-picker
            v-model="year_p"
            type="year"
            placeholder="请选择年份"
            value-format="YYYY"
            disabled
          />
        </el-row>
        <el-row :gutter="20" class="dialog_row">
          <el-col :span="1"></el-col>
          <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center;font-size: medium;">缴纳状态</span></el-col>
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio label="1" size="large">已缴纳</el-radio>
            <el-radio label="2" size="large">未缴纳</el-radio>
          </el-radio-group>
        </el-row>
        <el-row :gutter="20" class="dialog_row">
          <el-col :span="1"></el-col>
          <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center;font-size: medium;">缴纳时间</span></el-col>
          <el-date-picker
          v-model="day_picked"
          type="date"
          placeholder="请选择日期"
          :size="default"
          :disabled="radio1 == 2 ? true : false"
          value-format="YYYY-MM-DD"
        />
        </el-row>
        <el-row :gutter="20" class="dialog_row">
          <el-col :span="4"></el-col>
          <el-col :span="4" style="display: flex"><el-button type="primary" size="large" @click="dialogVisible = false">取消</el-button></el-col>
          <el-col :span="8" style="display: flex"><el-button type="primary" size="large" @click="handleAddPayment()">确认</el-button></el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-drawer v-model="drawer">
      <span style="font-size: large;">{{ drawer_roomid }}房间物业费缴纳信息</span>
      <el-table :data="drawer_data"  :default-sort="{ prop: 'year', order: 'ascending' }">
        <el-table-column  prop="year" label="年份" />
        <el-table-column  prop="ispaid" label="缴纳状态">
          <template #default="zone">
            <span>{{zone.row.ispaid == true ? '已缴纳' : '未缴纳'}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="pay_time" label="缴纳时间" />
        <el-table-column >
          <template #header>
            <el-button type="default" @click="dialogVisibleforpayment = true" align="content-center">新增</el-button>
          </template>
          <template #default="zone">
            <el-button type="default" @click="handleLookup_lease(zone.row)" align="content-center">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
    <el-card>
      <template #header>
        <div class = "card-header" style="margin-bottom:0px;">
          <span class="image-font" style="font-size:20px; margin: 0 auto">客户信息</span>
          <div>
            <el-button type="success" @click="">新增用户</el-button>
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
                <el-col :span="1"></el-col>
                <el-col :span="5" style="display: flex"><span style=" margin: 0 auto;align-self: center">电子邮箱</span></el-col>
                <el-col :span="14"><el-input v-model="add_email" /></el-col>
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
        <el-table :data="showClients"
                  :border="false" style="width: 100%; "
                  :row-style="{ height: '100px'}"
                  :expand-row-keys="expands"
                  @row-click="clickRowHandle"
                  row-key="id"
                  row-class-name="table_row"
        >
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
                <el-table-column label="物业费信息" prop="payment" align="center">
                  <template #default="scope">
                    <el-button type="primary" style="margin-left: 16px" @click="handleLookup(scope.$index, props.row, scope.row)">
                      查看
                    </el-button>
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
          <el-pagination layout="prev, pager, next" :total="this.clients.length" hide-on-single-page="true" @current-change="changePage" :current-page="currentPage"/>
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
            <el-button size="small" v-show="rooms.row.is_edit" @click="saveRoom(rooms.$index)">保存</el-button>
            <el-button size="small" v-show="!rooms.row.is_edit" type="danger" @click="deleteRoom(rooms.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {computed,ref} from 'vue'
import { ElMessage, ElMessageBox,ElDrawer,ElDatePicker } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

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
    return {
      dialogVisible: false,
      dialog_for_change: false,
      drawer: false,
      drawer_roomid: 0,
      drawer_room:{},
      drawer_data: [],
      drawer_person: {},
      drawer_lease_id: 0,
      year_picked: '',
      day_picked: '',
      radio1: '', 
      year_p: '',
      add_name: '',
      add_phone: '',
      add_legal: '',
      add_company: '',
      add_email: '',
      dialogVisibleforpayment: false,
      popovershow: false,
      clients: [ 
        {
          id:2,
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
              payment: {
                year: '2002',
                ispaid: true,
                paytime:'2002-09-18'
              }
            }
          ],
        },
      ],
      filterClients:[],
      showClients:[],
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
      dialog_name:'',
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
      language : "zhCn",
      currentPage: 1,
      expands:[]
    }
  },
  mounted() {
  },
  methods: {
    handleLookup_lease(payment){
      this.dialog_for_change = true
      this.year_p = payment.year
    },
    handleAddPayment() {
      const formData = new FormData()
      formData.append('token', localStorage.getItem('token'))
      formData.append('lease_id', this.drawer_room.lease_id)
      formData.append('year', this.year_picked)
      if (this.radio1 == '1') {
        formData.append('pay_time',this.day_picked)
      } else {
        formData.append('pay_time','')
      }
      this.$axios({
        method: 'POST',
        url: '/addPayment',
        data:formData
      }).then(res => {
        if (res.data.errno === 0) {
          ElMessage({
            type: 'success',
            message: '添加成功'
          })
          this.dialogVisibleforpayment = false
          this.getClientsInfo()
        }
        if (res.data.errno === 1002) {
          ElMessage({
            type: 'error',
            message: '年份超出租赁时段'
          })
        }
      })
    },
    handleAddClient() {
      const formData = new FormData()
      formData.append('new_name', this.add_name)
      formData.append('new_phone', this.add_phone)
      formData.append('new_company', this.add_company)
      formData.append('new_legal', this.add_legal)
      formData.append('new_email',this.add_email)
      this.$axios({
        method: 'POST',
        url: '/addNewClient',
        data: formData
      }).then(res => {
        if (res.data.errno === 0) {
          ElMessage({
            type: 'success',
            message: '添加成功'
          })
          this.getClientsInfo()
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
    getClientsInfo(){
      const that = this
      const formData = new FormData();
      formData.append('token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImZmZkBnZy5jb20iLCJleHAiOjc3ODcxODY4MjYsImVtYWlsIjoiZmZmQGdnLmNvbSJ9.AKB9ft6J9o1_X4ORdWAPCPGCN2EVLD-aktmJrYeZRxE')
      this.$axios({
        method:'POST',
        url:'/get_client_info',
        data: formData
      }).then(res => {
        that.clients = res.data.clients
        console.log(res.data.clients)
      })
      this.filterClients = this.clients
      this.showClients = this.filterClients.slice(0,10)
    },
    clickRowHandle(row,column,event){
      if (this.expands.includes(row.id)) {
        this.expands = this.expands.filter(val => val !== row.id);
        console.log(this.expands)
      } else {
        this.expands.push(row.id);
      }
      console.log(row.room)
    },
    handleLookup(index, client, room) {
      this.drawer_person = client
      this.drawer_room = room
      this.drawer_roomid = room.id
      this.drawer_data = room.payment
      this.drawer_lease_id = room.lease_id
      this.drawer = true
    },
    handleEdit(index,client){
      this.dialog_person = client
      this.dialog_name = client.name
      this.dialog_phone = client.phone
      this.dialog_company = client.company
      this.dialog_legal = client.legal_person
      this.show_dialog = true
    },
    handleDelete(index,client){
      ElMessageBox.confirm(
          '确认删除该用户?',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        const that = this
        const formData = new FormData();
        formData.append('id',client.id)
        formData.append('token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImZmZkBnZy5jb20iLCJleHAiOjc3ODcxODY4MjYsImVtYWlsIjoiZmZmQGdnLmNvbSJ9.AKB9ft6J9o1_X4ORdWAPCPGCN2EVLD-aktmJrYeZRxE')
        this.$axios({
          method:'POST',
          url:'/deleteClientInfo',
          data: formData
        }).then(res =>{
          console.log(res.data)
          if(res.data.errno === 0){
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            that.getClientsInfo()
          }else{
            ElMessage({
              type: 'error',
              message: '删除出错'
            })
          }
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
        this.show_dialog = false
        const that = this
        const formData = new FormData()
        formData.append('id',that.dialog_person.id)
        formData.append('new_name',that.dialog_name)
        formData.append('new_phone',that.dialog_phone)
        formData.append('new_company',that.dialog_company)
        formData.append('new_legal',that.dialog_legal)
        this.$axios({
          method:'POST',
          url: '/changeClientInfo',
          data: formData
        }).then( res => {
          console.log(res.data)
          if(res.data.errno === 0){
            ElMessage({
              type: 'success',
              message: '修改成功'
            })
            that.getClientsInfo()
          }else{
            ElMessage({
              type: 'error',
              message: '修改失败'
            })
          }
        }).catch({

        })
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
    saveRoom(index){
      const formData = new FormData()
      const start_time = new Date(this.lease_person.room[index].start_time)
      const end_time = new Date(this.lease_person.room[index].end_time)
      const sign_time = new Date(this.lease_person.room[index].sign_time)
      formData.append('id', this.lease_person.id)
      formData.append('room_id',this.lease_person.room[index].id)
      formData.append('start_time',start_time.getTime()/1000)
      formData.append('end_time',end_time.getTime()/1000)
      formData.append('sign_time',sign_time.getTime()/1000)
      formData.append('token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImZmZkBnZy5jb20iLCJleHAiOjc3ODcxODY4MjYsImVtYWlsIjoiZmZmQGdnLmNvbSJ9.AKB9ft6J9o1_X4ORdWAPCPGCN2EVLD-aktmJrYeZRxE")
      this.$axios({
        method:'POST',
        url:'/saveLeaseInfo',
        data: formData
      }).then(res =>{
        console.log(res.data)
        if(res.data.errno === 0){
          ElMessage({
            type: 'success',
            message: '保存成功'
          })
          this.getClientsInfo()
        }else{
          ElMessage({
            type: 'error',
            message: '保存出错'
          })
        }
      })
      this.lease_person.room[index].is_edit = false
    },
    deleteRoom(index){
      const formData = new FormData()
      formData.append('token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImZmZkBnZy5jb20iLCJleHAiOjc3ODcxODY4MjYsImVtYWlsIjoiZmZmQGdnLmNvbSJ9.AKB9ft6J9o1_X4ORdWAPCPGCN2EVLD-aktmJrYeZRxE')
      formData.append('id',this.lease_person.id)
      formData.append('room_id',this.lease_person.room[index].id)
      const that = this
      this.$axios({
        method: 'POST',
        url: '/deleteLeaseInfo',
        data: formData
      }).then(res =>{
        console.log(res.data)
        if(res.data.errno === 0){
          that.lease_person.room.splice(index,1)
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          this.getClientsInfo()
        }
      })
    },
    changePage(val){
      console.log(val)
      this.currentPage = val
      let start_index = (val-1) * 10
      let end_index = start_index + 10
      this.showClients = this.filterClients.slice(start_index,end_index)
    },
  },
  watch:{
    search(newValue){
      this.filterClients = computed(() =>
          this.clients.filter(
              (data) =>
                  !newValue ||
                  data.name.toLowerCase().includes(newValue.toLowerCase())
          ))
      this.showClients = this.filterClients.slice(0,10)
    },
    clients(newValue){
      this.filterClients = newValue
      this.showClients = this.filterClients.slice(0,10)
    },
  },
  created() {
    this.parentBorder = ref(false)
    this.childBorder = ref(false)
    this.search = ref('')
    this.getClientsInfo()
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
.table_row :hover{
  cursor: pointer;
}
</style>