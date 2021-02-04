import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../components/HomePage'
import myTable from '../components/MyTable'
import ready from '../components/Ready'
import index from '../components/Index'
import test from '../components/Test'
import returnOrder from '../components/ReturnOrder'
import login from '../components/Login'


Vue.use(Router)
const router = new Router({
  routes: [

    {
      path: '/index',
      component: index,
      meta: {title: '主页'}
    },

    {
      path: '/table',
      component:myTable,
      meta: {title:'分选'}
    },
    {
      path:'/ready',
      component: ready,
      meta: {title:'备料清单',requireAuth:true}
    },
    {
      path: '/test',
      component: test,
      meta: {title:'测试'}
    },
    {
      path:'/returnOrder',
      component: returnOrder
    },
    {
      path: '/',
      redirect:'/login'

    },
    {
      path: '/login',
      component: login,
      meta: {title:'登录'}
    }
  ],
  mode:'history'
})
router.beforeEach((to, from, next) => {
  // 1. 判断是不是登录页面
  // 是登录页面
  if(to.path === '/login') {
    next()
  } else {
    // 不是登录页面
    // 2. 判断 是否登录过
    let token = sessionStorage.getItem('username')
    token ? next() : next('/login')
  }
})

export default router
