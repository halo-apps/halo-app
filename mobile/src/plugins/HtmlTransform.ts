//首页VITE变量替换插件
let htmlTransform = (env: object) => {
  let VITE_RUNTIME_VERSION = new Date().getTime().toString()
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      // console.log(env)
      ///<title>(.*?)<\/title>/
      let keys = Object.keys(env)
      keys.forEach(key => {
        html = html.replaceAll(`{{${key}}}`, env[key])
      })
      let result = html.replace(/{{VITE_RUNTIME_VERSION}}/, VITE_RUNTIME_VERSION)
      return result
    },
  }
}
export default htmlTransform