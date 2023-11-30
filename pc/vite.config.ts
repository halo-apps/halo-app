import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {htmlTransform} from './src/plugins';
import {Plugin as importToCDN} from 'vite-plugin-cdn-import'

export default (({command, mode}) => {
  let envDir = '/env'
  const env = loadEnv(mode, process.cwd() + envDir)
  // console.log(env)
  return defineConfig({
    base: env.VITE_BASE,
    envDir: '.' + envDir,
    build: {
      outDir: env.VITE_PUBLISH_DIRECTORY
    },
    // root: './public',
    server: {
      open: true,
      host: '0.0.0.0',
      port: parseInt(env.VITE_PORT)
    },
    optimizeDeps: {
      exclude: ['echarts', 'vue'],
    },
    plugins: [
      vue(),
      vueJsx(),
      htmlTransform(env),
      //本地使用npm包引入，生产环境用CDN引入，可减少发布时间 和 生产页面加载速度
      // importToCDN({
      //   modules: [{
      //     name: 'element-plus',//依赖名称
      //     var: "ElementPlus",//全局变量名
      //     path: "https://cdn.jsdelivr.net/npm/element-plus@2.4.1/dist/index.full.min.js",//CDN链接
      //     css: "https://cdn.jsdelivr.net/npm/element-plus@2.4.1/dist/index.min.css", // 依赖有css就填，没有就去掉这个
      //   }]
      // })
    ],
    resolve: {
      alias: {
        //"hona-pc": "/hona",//引用 hona-pc，会指向到/hona文件夹，并使用package.json中的入口文件
      },
    },
  })
})