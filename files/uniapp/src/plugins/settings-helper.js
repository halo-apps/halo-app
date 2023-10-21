import settings from '../../static/settings.js'

//从本地配置文件拉取配置信息
export function getSettings() {
  return new Promise((resolve, reject) => {
    return resolve(settings)
  })
}
