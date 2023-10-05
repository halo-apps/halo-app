import {defineConfig, loadEnv} from "vite";
import vue from '@vitejs/plugin-vue';
import indexPlugin from "./src/plugins/html-transform";

export default (({command, mode}) => {
  let envDir = '/env'
  const env = loadEnv(mode, process.cwd() + envDir)
  // console.log(env)
  return defineConfig({
    base: '/', //配置资源路径是根目录
    env: '.' + envDir,
    server: {
      open: true,
      host: '0.0.0.0',
      https: false,
      port: parseInt(env.VITE_PORT)
    },
    css: { //防止vite build卡死
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    },
    plugins: [
      vue(),
      indexPlugin(env)
    ],
    resolve: {
      alias: {
      // "hona-mobile": "/hona"
      }
    }
  })
})