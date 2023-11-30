import app, {useAppStore} from "hona-pc"
import routes from "./router";
import lang from "./langs";
import "./styles/index.scss";

let appStore = useAppStore()

appStore.useEnv(import.meta.env)
//初始化全局配置
appStore.useGlobal(app)
//注册自定义路由
appStore.useRoutes(routes)
//加载自定义语言包
appStore.useI18n(lang)

//注册自定义局部组件
appStore.useComponents(app, import.meta.glob('./components/controls/**/*.vue', {eager: false}), './components/controls/', 'control')
appStore.useComponents(app, import.meta.glob('./components/headers/*.vue', {eager: false}), './components/headers/', 'header')
appStore.useComponents(app, import.meta.glob('./components/lists/**/*.vue', {eager: false}), './components/lists/', 'list')
appStore.useComponents(app, import.meta.glob('./components/pagings/**/*.vue', {eager: false}), './components/pagings/', 'paging')
appStore.useComponents(app, import.meta.glob('./components/partials/**/*.vue', {eager: false}), './components/partials/', 'partial')
appStore.useComponents(app, import.meta.glob('./components/singles/**/*.vue', {eager: false}), './components/singles/', 'single')
appStore.useComponents(app, import.meta.glob('./components/texts/**/*.vue', {eager: false}), './components/texts/', 'text')

//注册自定义视图
appStore.useComponents(app, import.meta.glob('./views/*.vue', {eager: false}), './views/', 'view')
appStore.useComponents(app, import.meta.glob('./views/**/*.vue', {eager: false}), './views/', 'view')

app.mount('.app')