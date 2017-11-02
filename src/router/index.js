import Vue from 'vue'
import Router from 'vue-router'
import Home from 'src/views/home/index'



Vue.use(Router)

export default new Router({
  linkActiveClass:"is-active",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component:resolve =>{
        require(['src/views/about/index'],resolve)
      }
    },
    {
      path: '/articles',
      name: 'article',
      component:resolve =>{
        require(['src/views/articles/index'],resolve)
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component:resolve =>{
        require(['src/views/contact/index'],resolve)
      }
    },
    {
      path: '/mancheng',
      name: 'mancheng',
      component:resolve =>{
        require(['src/views/contact/mancheng'],resolve)
      }
    }
  ]
})
//  'use strict'
// import Home from 'src/views/home/index'
// const routers = [
//     {
//       path: '/',
//       name: 'Hello',
//       component: Home
//     },
//     {
//       path: '/detail',
//       name: 'detail',
//       component:resolve =>{
//         require(['src/views/detail/index'],resolve)
//       }
//     }
// ]
// export default routers;
