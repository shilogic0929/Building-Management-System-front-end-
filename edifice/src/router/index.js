import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/menu/HomeView.vue'
import Layout from '@/layout/Layout.vue'
import PersonalPage from '@/views/menu/PersonalPage.vue'
import Login from '@/views/login/login.vue'
import seeHouse from '@/views/Rent/seeHouse.vue'
import houseDetail from '@/views/Rent/houseDetail.vue'

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
      show:true,
    },
    hidden: true
  },
  {
    path:'/skip',
    name:"跳转界面",
    meta: { title: "跳转界面"},
    component:  () => import('../views/login/skip.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect:"/login",
    children: [
      {
        path: 'dashboard',
        name: '首页',
        component: HomeView,
        meta: { 
          title: "首页",
          show:false,
        },
      },
      {
        path: 'personalPage',
        name: '个人资料',
        component: PersonalPage,
      },
      {
        path: 'about',
        name: '关于',
        component: () => import('../views/menu/AboutView.vue')
      },
      {
        path: 'seeHouse',
        name: '查看房源',
        component: seeHouse
      },
      {
        path: 'houseDetail',
        name: '房源信息',
        component: houseDetail,
      },
      {
        path: 'checkOrders',
        name: '查看订单',
        meta: { title: "查看订单" },
        component: () => import('../views/menu/checkOrders.vue'),
      },
      {
        path: 'shortRent',
        name: '短租',
        meta: { title: "短租" },
        component: () => import('../views/Rent/shortRent.vue'),
      },
      {
        path: 'longRent',
        name: '长租',
        meta: { title: "长租" },
        component:  () => import('../views/Rent/longRent.vue'),
      },
      
      {
        path: 'pay',
        name: '缴费',
        meta: { title: "缴费" },
        component:  () => import('../views/pay/pay.vue'),
      },
      {
        path: 'seeContract',
        name: '查看合同',
        meta: { title: "查看合同" },
        component:  () => import('../views/seeContract/seeContract.vue'),
      },
      {
        path: 'contractDetail',
        name: '合同信息',
        meta: { title: "合同信息" },
        component:  () => import('../views/seeContract/contractDetail.vue'),
      },
      {
        path: 'appraise',
        name: '评价界面',
        meta: { title: "评价界面" },
        component:  () => import('../views/Appraise/appraise.vue'),
      },
      {
        path: 'repair',
        name: '工单报修界面',
        meta: { title: "工单报修界面" },
        component:  () => import('../views/repair/repair.vue'),
      },
      // {
      //   path: 'uploadContract',
      //   name: '上传合同界面',
      //   meta: { title: "上传合同界面" },
      //   component:  () => import('../views/uploadContract/uploadContract.vue'),
      // },
      {
        path: 'serviceHome',
        name: '客服主页',
        meta: { title: "客服主页" },
        component:  () => import('../views/service/serviceHome.vue'),
      },
      {
        path: 'serviceHome',
        name: '客服主页',
        meta: { title: "客服主页" },
        component:  () => import('../views/service/serviceHome.vue'),
      },
      {
        path: 'addHouse',
        name: '添加房源',
        meta: { title: "添加房源" },
        component:  () => import('../views/service/addHouse.vue'),
      },

      {
        path: 'addHouseDetail',
        name: '添加房源细节',
        meta: { title: "添加房源细节" },
        component:  () => import('../views/service/addHouseDetail.vue'),
      },
      {
        path: 'verifyContract',
        name: '审核合同',
        meta: { title: "审核合同" },
        component:  () => import('../views/service/verifyContract.vue'),
      },
      {
        path: 'verifyRepair',
        name: '报修处理',
        meta: { title: "报修处理" },
        component:  () => import('../views/service/verifyRepair.vue'),
      },
      {
        path: 'repairDetail',
        name: '报修内容界面',
        meta: { title: "报修内容" },
        component:  () => import('../views/service/repairDetail.vue'),
      },
      {
        path: 'contractDetail',
        name: '客服查看合同',
        meta: { title: "客服查看合同" },
        component:  () => import('../views/service/contractDetail.vue'),
      },
      {
        path: 'usersInformation',
        name: '查看用户信息',
        meta: { title: "查看用户信息" },
        component:  () => import('../views/service/usersInformation.vue'),
      },
      {
        path: 'verifyOrders',
        name: '审核订单',
        meta: { title: "审核订单" },
        component:  () => import('../views/service/verifyOrders.vue'),
      },
      {
        path:'workers',
        name:"工人接单",
        meta: { title: "工人接单" },
        component:  () => import('../views/worker/worker.vue'),
      },
      {
        path:'myRepair',
        name:"个人报修界面",
        meta: { title: "个人报修界面" },
        component:  () => import('../views/repair/myRepair.vue'),
      },
      
    ]
  },

]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})




// router.beforeEach(async (to, from, next) => {
//   if (to.path == "/login") {
//     next({path: "/login"});
//   }
//   else {
//     next();
//   }
// });

export default router
