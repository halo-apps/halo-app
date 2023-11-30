# 介绍

Hona框架是一套融合并时刻跟进当下前沿技术的低代码框架，是在实践中一步一步深化，一步一步升华达到如今的状态的。

宗旨：提供快速开发跨平台系统（PC/Mobile/Desktop/API等）的能力。

Hona框架是一门艺术，框架进步的过程，也是不断突破自我，不断刷新认知的过程。

# 预览

PC/Mobile/Desktop/API效果
<div style="text-align: center;">
  <img alt="pc" src="https://tool-dev.honastar.com/demo/pc.png?v=1" height="80"/>
  <img alt="mobile" src="https://tool-dev.honastar.com/demo/mobile.png?v=1" height="80"/>
  <img alt="desktop" src="https://tool-dev.honastar.com/demo/desktop.png?v=1" height="80"/>
  <img alt="api" src="https://tool-dev.honastar.com/demo/api.png?v=1" height="80"/>
</div>

# 特征

1. 表单变动对比
2. 多语言支持
    1. 固定文案
    2. 业务文案
3. 多登录方式支持
    1. 用户名密码模式
    2. NIO SSO模式
    3. 自定义登录方式
4. 开放接口支持
5. 多表导入支持
6. 多模块支持
    1. 主从表为相同表场景，使用表模块的名称，来重新定义模块名字，防止模块重复
7. 多布局支持
    1. 页面布局
        1. 桌面布局
        2. 侧边布局
        3. 顶部布局
    2. 表单布局
        1. 多列布局
        2. 表格布局
        3. 树布局
        4. 统计布局
        5. 竞速条布局
        6. 自定义布局（简便易用）
8. 表达式支持
    1. 支持计算表达式
9. 系统变量支持
10. 多主题支持
    1. 暗色主题
    2. 默认主题
    3. 蓝色主题
    4. 自定义主题
11. 跨平台支持
    1. Desktop
    2.
12. 极速的开发体验
    1. 启动速度优化
    2. 发布速度超快：(PC：8s，普通方案：?s)

# 扩展插件

1. 定时任务
    1. 定时Http请求插件
    2. 自定义任务
2. 实时通信
    1. Fleck Socket插件
    2. 自定义Socket插件
3. 功能迁移
    1. 默认功能自动迁移
    2. 特殊自定义功能迁移

# 介绍

统一演示账号：sa 123456

| 包              | 版本                                                                                                                | 介绍                                         | 演示                                                                 |
|----------------|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------|--------------------------------------------------------------------|
| `hona-pc`      | [![Npm package version](https://badgen.net/npm/v/hona-pc)](https://www.npmjs.com/package/hona-pc)                 | PC框架：基于vue3、element-plus、vite构建            | [https://dev.honastar.com](https://dev.honastar.com)               |
| `hona-mobile`  | [![Npm package version](https://badgen.net/npm/v/hona-mobile)](https://www.npmjs.com/package/hona-mobile)         | Mobile框架：基于vue3、vant、vite构建                | [https://dev-mobile.honastar.com](https://dev-mobile.honastar.com) |
| `hona-desktop` | -                                                                                                                 | Windows/Linux/MacOS框架：基于tauri、vue3、vite4构建 | https://github.com/hona-star/hona-app/releases                     |                                                    |
| `Hona`         | [![NuGet stable version](https://badgen.net/nuget/v/Hona)](https://nuget.org/packages/Hona)                       | API框架：基于.net7构建                            | [https://api-dev.honastar.com](https://api-dev.honastar.com)       |
| `hona-harmony` | [![NuGet stable version](https://badgen.net/mvn/v/hona-android)](https://mvnrepository.com/artifact/hona-android) | 鸿蒙框架                                       | ...                                                                |
| `hona-android` | [![NuGet stable version](https://badgen.net/mvn/v/hona-android)](https://mvnrepository.com/artifact/hona-android) | 安卓框架                                       | ...                                                                |
| `hona-ios`     | ...                                                                                                               | IOS框架                                      | ...                                                                |

仓储介绍

| 目录        | 介绍         | 本地端口                              | 容器化 |
|-----------|------------|-----------------------------------|-----|
| `pc`      | PC端目录      | 3000                              | √   |
| `mobile`  | 移动端目录      | 3001                              | √   |
| `desktop` | 桌面端目录      | 3005:PC 3006:API                  | 安装包 |
| `api`     | 接口目录       | 3002:https 3003:https 3004:socket | √   |
| `app`     | 安卓/IOS开发目录 |                                   | 安装包 |

## 安装

```
git clone git@github.com:hona-app/hona-startup.git
```

## 开发教程

<a href="./pc/README.md">PC教程</a> | <a href="./mobile/README.md">Mobile教程</a> | <a href="./desktop/README.md">
Desktop教程</a> | <a href="./api/README.md">API教程</a>

Tips：建议不同项目端口步长为10，进而保证端口充足。

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

## 使用教程

最简洁的模块搭建流程是：

1. `创建数据表` 添加字段，设置字段属性
2. `创建模块` 并选择模块包含的数据表
3. `配置菜单` 配置菜单地址和实际模块中功能的映射关系，如：/sys_user/paging，表示菜单分页显示用户的数据
4. `页面刷新` 验证效果

如果不是超管，需要配置权限：

1. `创建角色` 定义角色可以访问的菜单
2. `分配角色` 指定哪些用户可以拥有不同权限的角色

## 案例

待办事项工具

行情工具

全文搜索工具

命令执行工具

缓存工具

格式工具

通知工具

压测工具

框架配置

数据库开发工具

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