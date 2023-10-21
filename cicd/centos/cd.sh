#!/bin/bash

cd /app

docker pull registry.cn-shanghai.aliyuncs.com/hona/tool-pc:
docker rm hona-pc-dev -f
#启动前执行的脚本
docker run -d -p 3005:80 --name hona-pc-dev