import CryptoJS from 'crypto-js'

//对字符串进行base64编码，返回编码后的字符串
export function base64Encode(s) {
  let utf8 = CryptoJS.enc.Utf8.parse(s)
  let result = CryptoJS.enc.Base64.stringify(utf8)
  return result
}

//对字符串进行base64解码，返回解码后的对象
export function base64Decode(encoded) {
  let base64 = CryptoJS.enc.Base64.parse(encoded)
  let decoded = CryptoJS.enc.Utf8.stringify(base64)
  return decoded
}

//对字符串进行md5加密
export function md5(content, toLower = false) {
  let result = CryptoJS.MD5(content).toString()
  return toLower ? result : result.toUpperCase()
}