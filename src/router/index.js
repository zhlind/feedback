import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      title:'提交反馈'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta:{
      title:'关于商城'
    }
  }
]

const router = new VueRouter({
  routes
})
const defaultTitle = '岗隆'
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title ? to.meta.title : defaultTitle
  next()
})

export default router
