import {createApp} from 'vue'
import App from './App.vue'
import "./styles/reset.scss"
import "./styles/index.scss"
import "./styles/themes/dark.scss"
import "./styles/themes/blue.scss"
import "./styles/iconfont/iconfont.css"
// import microApp from "@micro-zoe/micro-app";

// microApp.start()
createApp(App).mount('.desktop-app')
