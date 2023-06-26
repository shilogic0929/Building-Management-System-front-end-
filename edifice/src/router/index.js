import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import HomeView from '@/views/menu/HomeView.vue'
import Layout from '@/layout/Layout.vue'
import PersonalPage from '@/views/menu/PersonalPage.vue'
import Login from '@/views/login/login.vue'
//judge_type为页面检查类型，为0检查token，为1检查是否为管理员，为2检查是否为客户，为3检查是否为维修工
const routes = [{
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
        title: "登录",
        show: true,
        judge_type: -1
    },
    hidden: true
},
    // {
    //     path: '/skip',
    //     name: "跳转界面",
    //     meta: {
    //         title: "跳转界面"
    //     },
    //     component: () => import('../views/login/skip.vue'),
    // },
    {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: "/login",
        children: [{
                path: 'homeView',
                name: '首页',
                component: HomeView,
                meta: {
                    title: "首页",
                    show: false,
                    judge_type: 0
                },
            },
            {
                path: 'personalPage',
                name: '个人资料',
                component: PersonalPage,
                meta:{
                    judge_type: 0
                }
            },
            {
                path: 'clientView',
                name: '查看客户',
                meta: {
                    title: "查看客户",
                    judge_type: 1
                },
                component: () => import('../views/clientManage/clientView.vue'),
            },
            {
                path: 'repairReport',
                name: '报修界面',
                meta: {
                    title: "报修界面",
                    judge_type: 2
                },
                component: () => import('../views/repair/repairReport.vue'),
            },
            {
                path: 'repairDetail/:wid',
                name: '报修内容界面',
                meta: {
                    title: "报修内容",
                    judge_type: 3
                },
                component: () => import('../views/service/repairDetail.vue'),
            },
            {
                path: 'usersInformation',
                name: '查看用户信息',
                meta: {
                    title: "查看用户信息",
                    judge_type: 1
                },
                component: () => import('../views/service/usersInformation.vue'),
            },
            {
                path: 'myRepair',
                name: "个人报修界面",
                meta: {
                    title: "个人报修界面",
                    judge_type: 2
                },
                component: () => import('../views/repair/myRepair.vue'),
            },
            {
                path: 'handleRepair',
                name: "处理报修界面",
                meta: {
                    title: "处理报修界面",
                    judge_type: 1
                },
                component: () => import('../views/repair/handleRepair.vue'),
            },

            {
                path: 'repairService',
                name: "维修服务界面",
                meta: {
                    title: "维修服务界面",
                    judge_type: 3
                },
                component: () => import('../views/repair/repairService.vue'),
            },
            {
                path: 'woIn',
                name: '工人信息',
                meta: {
                    title: "工人信息",
                    judge_type: 1
                },
                component: () => import('../views/workerInformation/workerInformation.vue'),
            },
            {
                path: 'roomStatus',
                name: '房间状态',
                meta: {
                    title: "房间状态",
                    judge_type: 1
                },
                component: () => import('../views/roomStatus/roomStatus.vue'),
            },
            {
                path: '/collectWorks',
                name: "维修统计",
                meta: {
                    title: "维修统计",
                    judge_type: 1
                },
                component: () => import('../views/collect/collectWorks.vue')
            },
            {
                path: '/collectGuests',
                name: "访客统计",
                meta: {
                    title: "访客统计",
                    judge_type: 1
                },
                component: () => import('../views/collect/collectGuests.vue')
            },
            {
                path: '/rentIn',
                name: "个人租赁信息",
                meta: {
                    title: "个人租赁信息",
                    judge_type: 2
                },
                component: () => import('../views/repair/rentIn.vue')
            },
            {
                path: 'knowledgeBase',
                name: '维修知识库',
                meta: {
                    title: "维修知识库",
                    judge_type: 4
                },
                component: () => import('../views/knowledgeBase/knowledgeBase.vue'),

            }
        ]
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem('token')
    let type = localStorage.getItem('type')
    if(to.meta.judge_type === -1){
        if(token !== null){
            next(false)
        }else {
            next()
        }
    }
    else if(to.meta.judge_type === 0){
        if(token === null){
            next('/login')
        }else{
            next()
        }
    }
    else if(to.meta.judge_type === 1){
        if(token === null){
            next('/login')
        }else{
            if(type !== '-1'){
                next(false)
            }else next()
        }
    }
    else if(to.meta.judge_type === 2){
        if(token === null){
            next('/login')
        }else{
            if(type !== '0'){
                next(false)
            }
            else next()
        }
    }
    else if(to.meta.judge_type === 3){
        if(token === null){
            next('/login')
        }else{
            if(type !== '1' && type !== '2' && type !== '3'){
                next(false)
            }
            else next()
        }
    }
    else{
        if(token === null){
            next('/login')
        }else{
            if(type !== '-1' && type !== '1' && type !== '2' && type !== '3'){
                next(false)
            }
            else next()
        }
    }
});
export default router