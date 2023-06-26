import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import HomeView from '@/views/menu/HomeView.vue'
import Layout from '@/layout/Layout.vue'
import PersonalPage from '@/views/menu/PersonalPage.vue'
import Login from '@/views/login/login.vue'

const routes = [{
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
        title: "登录",
        show: true,
    },
    hidden: true
},
    {
        path: '/skip',
        name: "跳转界面",
        meta: {
            title: "跳转界面"
        },
        component: () => import('../views/login/skip.vue'),
    },
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
            },
        },
            {
                path: 'personalPage',
                name: '个人资料',
                component: PersonalPage,
            },
            {
                path: 'clientView',
                name: '查看合同',
                meta: {
                    title: "查看合同"
                },
                component: () => import('../views/clientManage/clientView.vue'),
            },
            {
                path: 'repairReport',
                name: '报修界面',
                meta: {
                    title: "报修界面"
                },
                component: () => import('../views/repair/repairReport.vue'),
            },
            {
                path: 'verifyRepair',
                name: '报修处理',
                meta: {
                    title: "报修处理"
                },
                component: () => import('../views/service/verifyRepair.vue'),
            },
            {
                path: 'repairDetail/:wid',
                name: '报修内容界面',
                meta: {
                    title: "报修内容"
                },
                component: () => import('../views/service/repairDetail.vue'),
            },
            {
                path: 'usersInformation',
                name: '查看用户信息',
                meta: {
                    title: "查看用户信息"
                },
                component: () => import('../views/service/usersInformation.vue'),
            },
            {
                path: 'myRepair',
                name: "个人报修界面",
                meta: {
                    title: "个人报修界面"
                },
                component: () => import('../views/repair/myRepair.vue'),
            },
            {
                path: 'handleRepair',
                name: "处理报修界面",
                meta: {
                    title: "处理报修界面"
                },
                component: () => import('../views/repair/handleRepair.vue'),
            },

            {
                path: 'repairService',
                name: "维修服务界面",
                meta: {
                    title: "维修服务界面"
                },
                component: () => import('../views/repair/repairService.vue'),
            },
            {
                path: 'woIn',
                name: '工人信息',
                meta: {
                    title: "工人信息"
                },
                component: () => import('../views/workerInformation/workerInformation.vue'),
            },
            {
                path: 'roomStatus',
                name: '房间状态',
                meta: {
                    title: "房间状态"
                },
                component: () => import('../views/roomStatus/roomStatus.vue'),
            },
            {
                path: '/collectWorks',
                name: "维修统计",
                meta: {
                    title: "维修统计"
                },
                component: () => import('../views/collect/collectWorks.vue')
            },
            {
                path: '/collectGuests',
                name: "访客统计",
                meta: {
                    title: "访客统计"
                },
                component: () => import('../views/collect/collectGuests.vue')
            },
            {
                path: 'knowledgeBase',
                name: '维修知识库',
                meta: {
                    title: "维修知识库"
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
// router.beforeEach(async (to, from, next) => {
//   if (to.path == "/login") {
//     next({path: "/login"});
//   }
//   else {
//     next();
//   }
// });
export default router