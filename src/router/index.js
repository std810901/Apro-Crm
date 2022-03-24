import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import Layout from '../views/layouts/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'redirect',
    redirect: '/system'
  },
  {
    path: '/system',
    name: 'COSMO CRM',
    component: Layout,
    children: [
      {
        path: 'modules-mangement',
        name: 'modules-mangement',
        component: () => import('@/views/modules-mangement/Style1.vue')
      },
      {
        path: 'modules-test',
        name: 'modules-test',
        component: () => import('@/views/modules-mangement/Test.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/Page404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = VueCookies.get('token')
  const isLogin = token // 這裡寫驗證機制(自己客製化)
  if (isLogin) {
    next() // 往下執行
  } else {
    // 如果使用者token無效則跳轉到login頁面
    if (to.path !== '/login') {
      next('/login')
    } else {
      next() // 往下執行
    }
  }
})

export default router
