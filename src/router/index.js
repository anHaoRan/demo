import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/HelloWorld' //首页

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
