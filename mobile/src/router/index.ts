import {RouteRecordRaw} from "vue-router";
import {LayoutIndex} from "hona-mobile";
import Home from "../views/Index.vue";

let routes: RouteRecordRaw[] = [
  {path: '/custom/index', meta: {title: '自定义页面'}, component: LayoutIndex, children: [{path: '', component: Home}]}
]

export default routes