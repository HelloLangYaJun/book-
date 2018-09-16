import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const components= {
  login: () => import('@/views/login/login'),
  layout: () => import('@/views/layout/index'),
  index: () => import('@/views/index/index'),
  user: () => import('@/views/users/index'),
  classify: () => import('@/views/book/classify'),
  books: () => import('@/views/book/books'),
  swiper: () => import('@/views/swiper/index')
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: components.login,
      meta:{
        title:'云书管理后台'
      }
    },
    {
      path: '/layout',
      name: 'Layout',
      component: components.layout,
      children:[
        {
          path:'index',
          component:components.index
        },
        {
          path:'users',
          component:components.user
        },
        {
          path:'books',
          component:components.books
        },
        {
          path:'classify',
          component:components.classify
        },
        {
          path:'swiper',
          component:components.swiper
        },
      ],
      meta:{
        title:'云书管理首页'
      },

    }
  ]
})
