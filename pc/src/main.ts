import app from "hona-pc/main"
import {useI18nStore, useComponentStore} from "hona-pc/stores";
import "./router";
import messages from "./langs";
import "./styles/index.scss";

let i18nStore = useI18nStore(), componentStore = useComponentStore()
//加载自定义语言包
i18nStore.addMessages(messages)
// 注册局部组件
componentStore.registerComponents(app, import.meta.glob('./partials/**/*.vue'), './partials/', 'partial')
// 注册自定义视图
componentStore.registerComponents(app, import.meta.glob('./views/*.vue'), './views/', 'view')
componentStore.registerComponents(app, import.meta.glob('./views/**/*.vue'), './views/', 'view')
