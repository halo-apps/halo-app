import app, {useAppStore} from "hona-mobile";
import routes from "./router";

//发布后，无法命中debugger，需要console.log

let appStore = useAppStore()

appStore.useEnv(import.meta.env)
//初始化全局配置
appStore.useGlobal(app)
// 注册自定义路由
appStore.useRoutes(routes)

// 注册自定义局部组件
appStore.useComponents(app, import.meta.glob('./components/controls/**/*.vue'), './components/controls/', 'control')
appStore.useComponents(app, import.meta.glob('./components/lists/**/*.vue'), './components/lists/', 'list')
appStore.useComponents(app, import.meta.glob('./components/pagings/**/*.vue'), './components/pagings/', 'paging')
appStore.useComponents(app, import.meta.glob('./components/partials/**/*.vue'), './components/partials/', 'partial')
appStore.useComponents(app, import.meta.glob('./components/singles/**/*.vue'), './components/singles/', 'single')
appStore.useComponents(app, import.meta.glob('./components/texts/**/*.vue'), './components/texts/', 'text')

//注册自定义视图
appStore.useComponents(app, import.meta.glob('./views/*.vue'), './views/', 'view')
appStore.useComponents(app, import.meta.glob('./views/*/*.vue'), './views/', 'view')

let components = {}
appStore.useComponent(app, components)

app.mount('.app')