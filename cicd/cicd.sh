#!/bin/bash #说明性描述不可以少
#set -e

#切换应用
cd ./${app}
echo -e '\033[35m2. Current app: '${app}'\033[0m'

#加载应用环境变量
. ./env/base.sh
. ./env/${env}.sh
echo -e '\033[35m3. Current environment: '${env}'\033[0m'

#生成应用版本号
if [ -z ${version} ]; then
  _temp_version=$(git rev-parse --short HEAD)
  #截取8位版本号
  version=${_temp_version:0:8}
fi
image=${image}:${version}
echo -e '\033[35m4. Image version: '${image}'\033[0m'

#CI构建
if [ -n "${ci}" ]; then
  . ../ci.sh
fi

#CD发布
. ../cd.sh
cd ..