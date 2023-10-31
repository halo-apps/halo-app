import app, {useRouterStore, useI18nStore, useComponentStore} from "hona-pc"
import routes from "./router";
import lang from "./langs";
import "./styles/index.scss";

let routerStore = useRouterStore(), i18nStore = useI18nStore(), componentStore = useComponentStore()

// 注册自定义路由
routerStore.addRoutes(routes)
// 加载自定义语言包
i18nStore.addMessages(lang)
// 注册局部组件
componentStore.registerComponents(app, import.meta.glob('./partials/**/*.vue'), './partials/', 'partial')
// 注册自定义视图
componentStore.registerComponents(app, import.meta.glob('./views/*.vue'), './views/', 'view')
componentStore.registerComponents(app, import.meta.glob('./views/**/*.vue'), './views/', 'view')

app.mount('.app')