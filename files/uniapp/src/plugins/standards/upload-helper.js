export function getFileIcon(url) {
  let extension = getExtension(url)
  let result = require(`../../../static/images/files/${extension.replace('.', '')}.png`)
  return result
}

function getExtension(url) {
  let index = url.lastIndexOf('.')
  if (index == -1)
    return ''
  return url.substring(index)
}

export function isImage(url) {
  let extension = getExtension(url)
  let images = ['.png', '.jpg', '.jpeg', '.bmp', '.gif']
  let result = images.indexOf(extension) > -1
  return result
}

//判断地址是否是http或者https
export function isHttpOrHttps(url) {
  let result = url.indexOf('http') == 0 || url.indexOf('https') == 0
  return result
}
