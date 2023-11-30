import {defineConfig, loadEnv} from "vite";
import vue from '@vitejs/plugin-vue';
import htmlTransform from "./src/plugins/HtmlTransform";

export default (({command, mode}) => {
  let envDir = '/env'
  const env = loadEnv(mode, process.cwd() + envDir)
  // console.log(env)
  return defineConfig({
    base: env.VITE_BASE, //配置资源路径是根目录，相对路径必须使用./（以/结尾）
    envDir: '.' + envDir,
    build: {
      //发布后，调试时可以看到源码，但是发包体积会2MB->60MB+
      sourcemap: true,
      outDir: env.VITE_PUBLISH_DIRECTORY
    },
    server: {
      open: true,
      host: '0.0.0.0',
      port: parseInt(env.VITE_PORT),
    },
    css: {
      //防止vite build卡死
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    },
    plugins: [
      vue(),
      htmlTransform(env)
    ],
    resolve: {
      alias: {
      // "hona-mobile": "/hona"
      }
    }
  })
})