import Vue from "vue"
import VueRouter from "vue-router"
import store from "../store";
import Login from "../components/Commons/Login";
import {getPageTitle} from "../plugins/url-helper";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    meta: {title: '登录'},
  }
]

//动态加载路由
const router = new VueRouter({routes})

router.beforeEach(async (to, from, next) => {
  //检查是否获取系统配置和用户信息
  if (!store.state.system.setting)
    await store.dispatch('system/getSetting')
  let token = await store.dispatch('user/getToken')
  if (!token) {
    //没有用户信息，直接跳转登录页面，防止请求其它接口得到401后再跳转
    if (to.path == '/login')//放行匿名访问页面，防止一直跳转/login导致死循环
      next()
    else
      next({path: '/login'})
  } else {
    //用户已经登录
    //没有菜单，才获取用户菜单
    if (!store.state.user.menu) {
      let routes = await store.dispatch('user/getMenu')
      router.addRoutes(routes)
      next({...to, replace: true}) //确保动态添加的新路由生效
    } else {
      next()
    }
  }
  document.title = getPageTitle(to.meta.title)
})

export default router
