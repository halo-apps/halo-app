# 介绍

Hona框架是一套融合并时刻跟进当下前沿技术的低代码框架，是在实践中一步一步深化，一步一步升华达到如今的状态的。

宗旨：提供快速开发跨平台系统（PC/Mobile/Desktop/API等）的能力。

Hona框架是一门艺术，框架进步的过程，也是不断突破自我，不断刷新认知的过程。

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

| 包            | 版本                                                                                                        | 介绍                              | 演示                                                                 |
|--------------|-----------------------------------------------------------------------------------------------------------|---------------------------------|--------------------------------------------------------------------|
| hona-pc      | [![Npm package version](https://badgen.net/npm/v/hona-pc)](https://www.npmjs.com/package/hona-pc)         | PC框架：基于vue3、element-plus、vite构建 | [https://dev.honastar.com](https://dev.honastar.com)               |
| hona-mobile  | [![Npm package version](https://badgen.net/npm/v/hona-mobile)](https://www.npmjs.com/package/hona-mobile) | Mobile框架：基于vue3、vant、vite构建     | [https://dev-mobile.honastar.com](https://dev-mobile.honastar.com) |
| hona-desktop | -                                                                                                         | Desktop框架：基于tauri、vue3、vite4构建  | https://github.com/hona-star/hona-app/releases                     |                                                    |
| Hona         | [![NuGet stable version](https://badgen.net/nuget/v/Hona)](https://nuget.org/packages/Hona)               | API框架：基于.net7构建                 | [https://api-dev.honastar.com](https://api-dev.honastar.com)       |
| hona-app     | ...                                                                                                       | 安卓/IOS端框架                       | ...                                                                |

仓储介绍

| 目录      | 介绍         | 教程                                     | 本地端口                              | 容器化 |
|---------|------------|----------------------------------------|-----------------------------------|-----|
| pc      | PC端目录      | <a href="./pc/README.md">使用教程</a>      | 3000                              | √   |
| mobile  | 移动端目录      | <a href="./mobile/README.md">使用教程</a>  | 3001                              | √   |
| desktop | 桌面端目录      | <a href="./desktop/README.md">使用教程</a> | 3005:PC 3006:API                  | 安装包 |
| api     | 接口目录       | <a href="./api/README.md">使用教程</a>     | 3002:https 3003:https 3004:socket | √   |
| app     | 安卓/IOS开发目录 | 使用教程                                   |                                   | 安装包 |

# 开发教程

建议每个项目端口步长为10，进而保证端口充足。

## 安装

````
git clone git@github.com:hona-star/hona-app.git
````

## 启动

````
cd pc

````

# 功能

| 功能                    | 介绍                                                    | PC | Desktop | Mobile | APP | API |
|-----------------------|-------------------------------------------------------|----|---------|--------|-----|-----|
| [多主题](#themes)        | 默认主题、暗色主题、蓝色主题等                                       | √  | √       | √      | ... | √   |
| [多布局](#layouts)       | 侧边布局、桌面布局、顶部布局等                                       | √  | √       | √      | ... | √   |
| [多语言](#languages)     | 中文、英文、匈牙利文等                                           | √  | √       | √      | ... | √   |
| [多控件](#controls)      | Text、Textarea、Code(多编程语言)                             | √  | √       | √      | ... | √   |
| [多数据库](#providers)    | SqlServer：稳定版 Sqlite：测试版 MySql、Oracle、Mongo、Trino：待完善 | -  | -       | -      | -   | √   |
| [多特征](#features)      |                                                       | √  | √       | √      | ... | √   |
| [多开放接口](#open_api)    |                                                       | -  | -       | -      | -   | √   |
| [多数据格式](#data_format) | xml、json等                                             | -  | -       | -      | -   | √   |
| [多登录方式](#ssos)        | 默认登录：稳定版 公司SSO：稳定版 飞书SSO：完善中                          | √  | √       | √      | ... | √   |
| [多签名验证](#signers)     |                                                       | √  | √       | √      | ... | √   |
| [多会话保持](#sessions)    |                                                       | -  | -       | -      | -   | √   |
| [多授权验证](#auths)       |                                                       | -  | -       | -      | -   | √   |
| [多上传方式](#uploads)     | Server FileServer CDN                                 | √  | √       | √      | ... | √   |
| [强大自定义](#custom)      |                                                       | √  | √       | √      | ... | √   |

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