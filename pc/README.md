## 介绍

Hona PC端框架，依赖hona-api提供数据后，即可快速构建系统页面。

## 安装教程

````
git clone git@github.com:hona-app/hona-startup.git
````

## 启动教程

````
依赖项：需先启动后端服务，教程参见：/api/README.md
````

````
cd pc
pnpm install（或：npm install）
npm run dev
````

# 目录介绍

src/components

` controls ` 存放自定义表单控件

` lists ` 存放自定义列表布局视图

` pagings ` 存放自定义分页布局视图

` partials ` 存放自定义局部视图

` singles ` 存放自定义单页布局视图

` texts ` 存放自定义文本控件视图

src/views

` */* ` 放置自定义视图（视图路径决定路由路径）

# 特性

1. 支持智能提示
2. 入口文件引用优先级从低到高：main -> browser -> module -> exports[import]