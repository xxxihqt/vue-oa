import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/views/404.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    }, {
      path: '/index',
      name: 'home',
      component: Home
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

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.email ? true :false;
    if(to.path == '/login' || to.path == '/register'){
      next();
    }else{
      isLogin ? next() : next('/login');
    }
  
})

export default router;
