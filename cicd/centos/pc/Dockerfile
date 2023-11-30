# 构建阶段
FROM registry.cn-shanghai.aliyuncs.com/hona-base/pnpm:8.11.0 AS build
WORKDIR /src
COPY "../../pc" .
COPY "../../cicd/centos/pc" "./cicd"
RUN ls -ld $PWD/*
RUN npm config set registry https://registry.npm.taobao.org
RUN pnpm install
RUN npm run build #一次构建,多环境使用

# 生成镜像阶段
FROM registry.cn-shanghai.aliyuncs.com/hona-base/nginx:1.25.3
WORKDIR /app
# 表示数据来源于publish镜像目录下的文件
COPY --from=build /src/dist/  /app
# 覆盖nginx配置文件
COPY --from=build /src/cicd/default.conf /etc/nginx/conf.d/
# 复制启动脚本
COPY --from=build /src/cicd/start.sh /
EXPOSE 80
ENTRYPOINT ['/start.sh']