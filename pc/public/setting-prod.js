window.setting = {
  api: {
    //如果域名自动重定向到https，则必须使用https域名，因为https不允许请求http或者未授权域名
    url: 'https://api.honastar.com'
  },
  env: 'prod',
  web: {
    debug: true,//是否开启调试模式（用于打印调试数据）
    sidebar: {
      width: 210,//侧标栏宽度，默认210px
    },
    mta_app_id: '500721809'
  }
}