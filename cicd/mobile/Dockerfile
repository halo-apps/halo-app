# 构建阶段
FROM registry.cn-shanghai.aliyuncs.com/hona-base/pnpm:8.11.0 AS build

WORKDIR /cicd
COPY ../../cicd/mobile .
RUN ls -ld $PWD/*

WORKDIR /src
COPY ../../mobile .
RUN ls -ld $PWD/*
RUN npm config set registry https://registry.npm.taobao.org
RUN pnpm install
RUN npm run mobile:build #一次构建,多环境使用

# 生成镜像阶段
FROM registry.cn-shanghai.aliyuncs.com/hona-base/nginx:1.25.3 as publish

# 复制构建后的文件到/app目录
WORKDIR /app
COPY --from=build /src/dist/  /app
RUN ls -ld $PWD/*

# 覆盖nginx配置文件
WORKDIR /cicd
COPY --from=build /cicd/ .
RUN ls -ld $PWD/*
# 测试发现步骤是并行执行，所以上面可能还没拷贝到/cicd，所以这里必须用--from=build，采用上一步的数据
COPY --from=build /cicd/default.conf /etc/nginx/conf.d/
EXPOSE 80

# 容器启动命令，用了会导致容器无法启动
#ENTRYPOINT ["/bin/bash", "-c", "cd /app"]