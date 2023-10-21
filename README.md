# 介绍

Hona框架是一套融合并时刻跟进当下前沿技术的低代码框架。

宗旨：提供快速跨平台（PC/Mobile/Desktop/API等）开发能力。

框架的概念，是在实践中一步一步深化，一步一步升华的。

框架是一门艺术。框架进步的过程，也是不断突破自己，不断刷新自己认知的过程。

# 目录

PC/Mobile/Desktop/API效果
<div style="text-align: center;">
  <img alt="pc" src="https://tool-dev.honastar.com/demo/pc.png?v=1" height="80"/>
  <img alt="mobile" src="https://tool-dev.honastar.com/demo/mobile.png?v=1" height="80"/>
  <img alt="desktop" src="https://tool-dev.honastar.com/demo/desktop.png?v=1" height="80"/>
  <img alt="api" src="https://tool-dev.honastar.com/demo/api.png?v=1" height="80"/>
</div>

# 介绍

统一演示账号：sa 123456

| 包            | 版本                                                                                                        | 介绍                                | 演示                                                                 |
|--------------|-----------------------------------------------------------------------------------------------------------|-----------------------------------|--------------------------------------------------------------------|
| hona-pc      | [![Npm package version](https://badgen.net/npm/v/hona-pc)](https://www.npmjs.com/package/hona-pc)         | 基于vue3、element-plus、vite4构建的PC端框架 | [https://dev.honastar.com](https://dev.honastar.com)               |
| hona-mobile  | [![Npm package version](https://badgen.net/npm/v/hona-mobile)](https://www.npmjs.com/package/hona-mobile) | 基于vue3、vant4、vite4构建的Mobile端框架    | [https://dev-mobile.honastar.com](https://dev-mobile.honastar.com) |
| hona-desktop | ...                                                                                                       | 基于tauri、vue3、vite4构建的Desktop端框架   | https://github.com/hona-star/hona-app/releases                     |                                                    |
| Hona         | [![NuGet stable version](https://badgen.net/nuget/v/Hona)](https://nuget.org/packages/Hona)               | 基于.net7构建的API框架                   | [https://api-dev.honastar.com](https://api-dev.honastar.com)       |
| hona-app     | ...                                                                                                       | 安卓、IOS端框架                         | ...                                                                |

# 开发教程

## 默认端口介绍

| 端口   | 介绍                    |
|------|-----------------------|
| 3000 | PC服务端口                |
| 3001 | Mobile服务端口            |
| 3002 | PC、Mobile服务接口http端口   |
| 3003 | PC、Mobile服务接口https端口  |
| 3004 | PC、Mobile服务接口socket端口 |
| 3005 | Desktop服务前端端口         |
| 3006 | Desktop服务接口端口         |

建议每个项目端口步长为10，进而保证端口充足。

# 安装

# 用法

| 功能                    | 介绍                                                    | PC | Desktop | Mobile | APP | API |
|-----------------------|-------------------------------------------------------|----|---------|--------|-----|-----|
| [多主题](#themes)        | 默认主题、暗色主题、蓝色主题、等                                      | √  | √       | √      | ... | √   |
| [多布局](#layouts)       | 侧边布局、桌面布局、顶部布局、等                                      | √  | √       | √      | ... | √   |
| [多语言](#languages)     | 中文、英文、匈牙利文、等                                          | √  | √       | √      | ... | √   |
| [多控件](#controls)      |                                                       | √  | √       | √      | ... | √   |
| [多数据库](#providers)    | SqlServer：稳定版 Sqlite：测试版 MySql、Oracle、Mongo、Trino：待完善 | -  | -       | -      | -   | √   |
| [多特征](#features)      |                                                       | √  | √       | √      | ... | √   |
| [多开放接口](#open_api)    |                                                       | -  | -       | -      | -   | √   |
| [多数据格式](#data_format) | xml、json、等                                            | -  | -       | -      | -   | √   |
| [多登录方式](#ssos)        | 默认登录：稳定版 公司SSO：稳定版 飞书SSO：完善中                          | √  | √       | √      | ... | √   |
| [多签名验证](#signers)     |                                                       | √  | √       | √      | ... | √   |
| [多会话保持](#sessions)    |                                                       | -  | -       | -      | -   | √   |
| [多授权验证](#auths)       |                                                       | -  | -       | -      | -   | √   |
| [多上传方式](#uploads)     | Server FileServer CDN                                 | √  | √       | √      | ... | √   |
| [强大/轻量自定义](#custom)   |                                                       | √  | √       | √      | ... | √   |

## 更多

## PC功能

### 新增功能

单个添加、批量导入、多表导入

### 修改功能

单个修改、（考虑中：批量覆盖，多表覆盖）

### 删除功能

单个删除、批量删除

### 详情功能

## 更少

更少的内存占用

# 更小

更小的资源包

更小的迁移成本

## 更快

更快的调试速度
API：3s内

更快的启动速度
API：1s内

## 更好

更好的开发体验