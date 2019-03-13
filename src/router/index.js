import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from  '@/cookie/cookie.js'
Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component:resolve => require(['@/pages/home/home'],resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login/login'],resolve)
    },
    {
      path: '/register',
      name: 'register',
      component:resolve => require(['@/pages/register/register'],resolve)
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component:resolve => require(['@/pages/edit/edit'],resolve),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component:resolve => require(['@/pages/userinfo/userinfo'],resolve),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/teamwork_edit/:id',
      name: 'teamwork_edit',
      component:resolve => require(['@/pages/teamwork_edit/teamwork_edit'],resolve),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/notice_board/:username',
      name: 'notice_board',
      component:resolve => require(['@/pages/notice_board/notice_board'],resolve),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/file',
      name: 'file',
      component: resolve => require(['@/pages/file/file'],resolve),
      meta:{
        requiresAuth:true
      },
      children:[
        {
          path: '/',
          name: '/',
          redirect:"/file/myfile"
        },
        {
          path: 'myfile',
          name: 'myfile',
          // component: news,
          component:resolve => require(['@/pages/myfile/myfile'],resolve)
        },
        {
          path: 'teamworkfile',
          name: 'teamworkfile',
          // component: news,
          component:resolve => require(['@/pages/teamworkfile/teamworkfile'],resolve)
        },
        {
          path: 'starfile',
          name: 'starfile',
          // component: news,
          component:resolve => require(['@/pages/starfile/starfile'],resolve)
        },
        {
          path: 'correction_bin',
          name: 'correction_bin',
          component:resolve => require(['@/pages/correction_bin/correction_bin'],resolve)
        },
      ]
    }
  ],
})
router.beforeEach((to,from,next)=>{
    if(to.matched.some(recode=>recode.meta.requiresAuth)){
      var username = getCookie("username")
      if(typeof username=='string'&&username){
        next();
        return;
      }
      alert("你还未登陆!")
      next('/login')
    }else{
      next();
    }
})

export default router;
