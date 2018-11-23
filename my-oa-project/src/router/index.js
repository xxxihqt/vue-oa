import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/views/404.vue'
import Index from '@/views/Index.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Infoshow from '@/views/Infoshow.vue'
import fundlist from '@/views/fundlist.vue'




Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'index',
      component: Index,
      children:[{
        path:'',
        component:Home
      },{
        path:'/home',
        name:'home',
        component:Home
      },{
        path:'/infoshow',
        name:'infoshow',
        component:Infoshow
      },{
        path:'/fundlist',
        name:'fundlist',
        component:fundlist
      }]
    },{
      path: '*',
      name: '/404',
      component: ErrorPage
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.email ? true :false;
    if(to.path == '/login' || to.path == '/register'){
      next();
    }else{
      isLogin ? next() : next('/login');
    }
  
})

export default router;
