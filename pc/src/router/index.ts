import {LayoutIndex} from "hona-pc"
import Home from "../views/Index.vue";
import local from "./local";

//重写插件的路由
let routes = [
  //设置默认首页
  {path: '/home', component: Home},
  {path: '/custom/index', component: LayoutIndex, children: [{path: '', component: Home}]}
]

export default routes