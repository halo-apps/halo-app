let indexPlugin = (env) => {
  let VITE_RUNTIME_VERSION = new Date().getTime().toString()
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      // console.log(env)
      ///<title>(.*?)<\/title>/
      let result = html
        .replace(/<%= VITE_SETTING_FILE %>/, env.VITE_SETTING_FILE)
        .replace(/<%= VITE_RUNTIME_VERSION %>/, VITE_RUNTIME_VERSION)
      return result
    },
  }
}
export default indexPlugin