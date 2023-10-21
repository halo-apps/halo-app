#!/bin/bash

#构建镜像
if [ ${env} == dev ]; then
  if [ ${restart} -eq 1 ]; then
    echo -e '\033[35m5. Stopping\033[0m'
    systemctl stop kubelet docker
  fi

  echo -e '\033[35m6. Building '${image}'\033[0m'
  #创建镜像，并打印dockerfile的运行输出结果，并指定上下文路径(/或者相对路径)，保证上级目录的文件可以被访问并拷贝到镜像中
  docker build --progress=plain --no-cache -t ${image} -f Dockerfile ../../
  if [ ${restart} -eq 1 ]; then
    echo -e '\033[35m7. Starting\033[0m'
    systemctl start docker kubelet
  fi

  docker push ${image}
  docker tag ${image} ${image}
  docker rmi $(docker images -f "dangling=true" -q) #删除空悬镜像
fi