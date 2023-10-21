//自动使用各个环境的配置文件

let env = process.argv.slice(-1)[0] //不配置为生产环境
if (env == 'dev') {
  require('electron-reloader')(module, {}); //开发环境启用热加载
} else {
  env = 'prod'
}

//是否需要每个环境，各自不打包其它环境的配置文件？
let result = require(`../env/env.${env}`)//引用具体环境的配置文件
result.exe = 'Hona.Api.exe'//接口执行入口文件
result.env = env

module.exports = result