let indexPlugin = (env: object) => {
  let VITE_RUNTIME_VERSION = new Date().getTime().toString()
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      // console.log(env)
      ///<title>(.*?)<\/title>/
      let keys = Object.keys(env)
      keys.forEach(key => {
        html = html.replace(`<%= ${key} %>`, env[key])
      })
      let result = html.replace(/<%= VITE_RUNTIME_VERSION %>/, VITE_RUNTIME_VERSION)
      return result
    },
  }
}
export default indexPlugin