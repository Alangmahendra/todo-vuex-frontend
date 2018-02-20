import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import nav from './nav'
// import Todoitem from '@/components/Todoitem'
// import Header from '@/components/Header'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter : nav.authNav
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter : nav.globalNav
    }
  ]
})
