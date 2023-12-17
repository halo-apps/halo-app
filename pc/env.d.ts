/// <reference types="vite/client" />

//导出模块声明的文件
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    t: (key: any, options: any = null) => string,
    $t_enum: (name: string, value: string, options: any = null) => string,
    $t_field: (table: string, field: string, options: any = null) => string,
    $t_field_choose_placeholder: (table: string, field: string, options: any = null) => string,
    $t_field_placeholder: (table: string, field: string, options: any = null) => string,
    $t_module: (type: string, key: string, options: any = null) => string,
    $t_menu: (key: string, options: any = null) => string,
  }
}

// 声明支持引用.vue文件，防止报错不识别.vue文件
declare module "*.vue" {
  import {DefineComponent} from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

//定义环境变量的智能提示
interface ImportMetaEnv {
  readonly VITE_BASE: string,
  readonly VITE_PORT: number,
  readonly VITE_PUBLISH_DIRECTORY: string,
  readonly VITE_ROOT: string,
  readonly VITE_SETTING_FILE: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}