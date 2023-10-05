import app from "hona-mobile";
import {useComponentStore, useRouterStore} from "hona-mobile/stores";
import routes from "./router";

let routerStore = useRouterStore(), componentStore = useComponentStore()
routerStore.addRoutes(routes)

//注册自定义视图
componentStore.registerComponents(app, import.meta.glob('./views/*.vue'), './views/', 'view')
componentStore.registerComponents(app, import.meta.glob('./views/*/*.vue'), './views/', 'view')

let components = {}
componentStore.add(app, components)