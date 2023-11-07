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
componentStore.registerComponents(app, import.meta.glob('./components/controls/**/*.vue'), './components/controls/', 'control')
componentStore.registerComponents(app, import.meta.glob('./components/lists/**/*.vue'), './components/lists/', 'list')
componentStore.registerComponents(app, import.meta.glob('./components/pagings/**/*.vue'), './components/pagings/', 'paging')
componentStore.registerComponents(app, import.meta.glob('./components/partials/**/*.vue'), './components/partials/', 'partial')
componentStore.registerComponents(app, import.meta.glob('./components/singles/**/*.vue'), './components/singles/', 'single')
componentStore.registerComponents(app, import.meta.glob('./components/texts/**/*.vue'), './components/texts/', 'text')
// 注册自定义视图
componentStore.registerComponents(app, import.meta.glob('./views/*.vue'), './views/', 'view')
componentStore.registerComponents(app, import.meta.glob('./views/**/*.vue'), './views/', 'view')

app.mount('.app')