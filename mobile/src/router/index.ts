import {RouteRecordRaw} from "vue-router";
import "hona-mobile/router"
import Layout from "hona-mobile/views/layouts/Index.vue";
import Home from "../views/Index.vue";

let routes: RouteRecordRaw[] = [
  {path: '/custom/index', meta: {title: '自定义页面'}, component: Layout, children: [{path: '', component: Home}]}
]

export default routes