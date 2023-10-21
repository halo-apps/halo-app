import Vue from 'vue'

// export function registerComponents() {
//   //动态注入所有依赖组件[不能放在其它js文件中]
//   let componentFiles = require.context('../../../custom/partial', true, /.+\.vue$/)
//   let components = componentFiles.keys().reduce((modules, modulePath) => {
//     let value = componentFiles(modulePath)
//     let componentName = value.default.name
//     componentName = modulePath.replace(/^\.\/(.*)\.\w+$/, '/$1')
//     componentName = getComponentName(componentName)
//     // console.log(componentName)
//     modules[componentName] = value.default
//     return modules
//   }, {})
//   //注册所有自定义组件为全局组件
//   _.each(components, function (v, k) {
//     //组件名称大小写敏感
//     Vue.component(k, v)
//   })
// }

//获取组件名称
export function getComponentName(path) {
  //全局组件注册时名称大小写敏感，为了防止配置时大小写不一致，所以强转小写
  return 'custom' + path.replace(/\//g, '-').toLowerCase()
}
