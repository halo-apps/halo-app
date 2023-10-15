import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import indexPlugin from "./src/plugins/html-transform";

export default defineConfig(({command, mode}) => {
  let envDir = '/env'
  const env = loadEnv(mode, process.cwd() + envDir)
  // console.log(env)
  return {
    base: env.VITE_PUBLIC_DIRECTORY,
    envDir: '.' + envDir,
    build: {
      outDir: env.VITE_PUBLISH_DIRECTORY,
    },
    // root: './public',
    server: {
      open: true,
      host: '0.0.0.0',
      https: false,
      port: parseInt(env.VITE_PORT)
    },
    optimizeDeps: {
      exclude: ['echarts', 'vue']
    },
    plugins: [
      vue(),
      vueJsx(),
      indexPlugin(env),
    ],
    resolve: {
      alias: {
        // "hona-pc": "/hona",
      }
    },
  }
})