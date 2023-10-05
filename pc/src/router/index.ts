import "hona-pc/router"
import {useRouterStore} from "hona-pc/stores";
import Layout from "hona-pc/views/layouts/Index.vue"
import Home from "../views/Index.vue";
import local from "./local";

//重写插件的路由
let routes = [
  //设置默认首页
  {path: '/home', component: Home},
  {path: '/custom/index', component: Layout, children: [{path: '', component: Home}]}
]

let routerStore = useRouterStore()
routes.forEach(route => {
  routerStore.router.addRoute(route)
});

export default routerStore.router