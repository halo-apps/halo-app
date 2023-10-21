#!/bin/bash #说明性描述不可以少

# 打印每次执行的命令
set -x

#读取命令行参数
while getopts "a:b:e:v:" opt;
do
  case $opt in
    a) app=$OPTARG ;;
    b) branch=$OPTARG ;;
    c) ci=$OPTARG ;;
    e) env=$OPTARG ;;
    v) version=$OPTARG ;;
    *) ;;
  esac
done

#默认值
branch=${branch:-master}
env=${env:-dev}

#切换分支
git reset --hard                           #重置git改动
git checkout -b ${branch} origin/${branch} #创建本地分支
git checkout ${branch}                     #切换本地分支
echo -e '\033[35m1. Current branch: '${branch}'\033[0m'
git pull

if [ -n "$app" ]; then
  . ./cicd.sh
else
  app=pc && . ./cicd.sh
  app=mobile && . ./cicd.sh
  app=api && . ./cicd.sh
fi