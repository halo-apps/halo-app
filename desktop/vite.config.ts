import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  let envDir = '/env'
  const env = loadEnv(mode, process.cwd() + envDir)
  return {
    server: {
      port: parseInt(env.VITE_PORT)
    },
    plugins: [vue({
      // template: {
      //   compilerOptions: {
      //     // 注册自定义组件micro-app 防止控制台警告
      //     isCustomElement: tag => /^micro-app/.test(tag)
      //   }
      // }
    })]
  }
})