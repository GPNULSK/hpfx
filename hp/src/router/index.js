import Vue from 'vue'
import Router from 'vue-router'
import homePage from '../components/HomePage'
import myTable from '../components/MyTable'
import ready from '../components/Ready'
import index from '../components/Index'
import test from '../components/Test'
import returnOrder from '../components/ReturnOrder'


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
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
      meta: {title:'备料清单'}
    },
    {
      path: '/test',
      component: test,
      meta: {title:'测试'}
    },
    {
      path:'/returnOrder',
      component: returnOrder
    }


  ]
})
