//首页VITE变量替换插件
let htmlTransform = (env: object) => {
  let time = new Date().toLocaleString()
  let VITE_RUNTIME_VERSION = time.replace(/[\/:]/g, '').replace(' ', '_')
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