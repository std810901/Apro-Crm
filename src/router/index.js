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
    redirect: '/system/auth-management'
  },
  {
    path: '/system',
    name: 'redirect',
    redirect: '/system/auth-management'
  },
  {
    path: '/template-management',
    name: 'redirect',
    redirect: '/template-management/module-category-management'
  },
  {
    path: '/system',
    name: '系統管理',
    component: Layout,
    children: [
      {
        path: 'auth-management',
        name: '權限管理',
        component: () => import('@/views/system-management/Auth.vue')
      },
      {
        path: 'account-management',
        name: '用戶管理',
        component: () => import('@/views/system-management/Account.vue')
      },
      {
        path: 'main-setting',
        name: '主要設定',
        component: () => import('@/views/system-management/MainSetting.vue')
      }
    ]
  },
  {
    path: '/question-management',
    name: '問題管理',
    component: Layout,
    children: [
      {
        path: '',
        name: '問題',
        component: () =>
          import('@/views/question-management/QuestionManagement.vue')
      },
      {
        path: 'tag-category-management',
        name: '標籤選項管理',
        component: () =>
          import('@/views/question-management/TagCategoryManagement.vue')
      },
      {
        path: 'tag-management/:id',
        name: '標籤管理',
        component: () => import('@/views/question-management/TagManagement.vue')
      }
    ]
  },
  {
    path: '/template-management',
    name: '版型管理',
    component: Layout,
    children: [
      {
        path: 'module-category-management',
        name: '模組管理',
        component: () =>
          import('@/views/template-management/ModuleCategoryManagement.vue')
      },
      {
        path: 'module-management/:id',
        name: '模塊列表',
        component: () =>
          import('@/views/template-management/ModuleManagement.vue')
      },
      {
        path: 'frontpage-management',
        name: '首頁管理',
        component: () =>
          import('@/views/template-management/FrontPageManagement.vue')
      },
      {
        path: 'innerpage-management',
        name: '內頁管理',
        component: () =>
          import('@/views/template-management/InnerPageManagement.vue')
      }
    ]
  },

  {
    path: '/substation',
    name: '子站管理',
    component: Layout,
    children: [
      {
        path: '',
        name: '會員帳號',
        component: () => import('@/views/substation-management/substation.vue')
      },
      {
        path: 'substation/:id',
        name: '網域',
        component: () => import('@/views/substation-management/domain.vue')
      }
    ]
  },
  {
    path: '/notification',
    name: '通知中心管理',
    component: Layout,
    children: [
      {
        path: '',
        name: '通知分類',
        component: () => import('@/views/notification/NotificationCategory.vue')
      },
      {
        path: 'news/:id',
        name: '最新消息',
        component: () => import('@/views/notification/News.vue')
      }
    ]
  },
  {
    path: '/personal',
    name: '個人設定',
    component: Layout,
    children: [
      {
        path: '',
        name: null,
        component: () => import('@/views/personal/Personal.vue')
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
    path: '/500',
    name: '500',
    component: () => import('@/components/Page500'),
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
