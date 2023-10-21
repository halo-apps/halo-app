#!/bin/bash

cd /app/Hona.Tool
git reset --hard
git pull
cd cicd/pc
docker build --progress=plain --no-cache -t registry.cn-shanghai.aliyuncs.com/hona/hona-pc -f Dockerfile ../../