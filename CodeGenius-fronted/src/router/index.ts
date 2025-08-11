import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccessEnum from '@/access/accessEnum.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ==================== 基础页面路由 ====================
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: '关于' },
    },

    // ==================== 用户相关路由 (/user) ====================
    {
      path: '/user/login',
      name: 'userLogin',
      component: () => import('@/views/user/UserLogin.vue'),
      meta: { title: '用户登录', requiresAuth: false },
    },
    {
      path: '/user/register',
      name: 'userRegister',
      component: () => import('@/views/user/UserRegister.vue'),
      meta: { title: '用户注册', requiresAuth: false },
    },
    {
      path: '/user/center',
      name: 'userCenter',
      component: () => import('@/views/user/UserCenter.vue'),
      meta: { title: '用户中心', requiresAuth: true },
    },

    // ==================== 管理员路由 (/admin) ====================
    {
      path: '/admin/userManage',
      name: 'adminUserManage',
      component: () => import('../views/user/UserManage.vue'),
      meta: {
        title: '用户管理',
        requiresAuth: true,
        requiresAdmin: true,
        access: AccessEnum.ADMIN,
      },
    },
    {
      path: '/admin/appManage',
      name: 'adminAppManage',
      component: () => import('../views/app/AppManage.vue'),
      meta: {
        title: '应用管理',
        requiresAuth: true,
        requiresAdmin: true,
        access: AccessEnum.ADMIN,
      },
    },{
      path: '/admin/appManage',
      name: 'adminAppManage',
      component: () => import('../views/app/AppManage.vue'),
      meta: {
        title: '应用管理',
        requiresAuth: true,
        requiresAdmin: true,
        access: AccessEnum.ADMIN,
      },
    },
  ],
})

export default router
