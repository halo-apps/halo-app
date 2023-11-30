#!/bin/bash

# 查询stash（含冲突文件、新增文件）文件列表，并保存到集合
conflict_files=$(git status --short | awk '{$1=""; print $0}' | sed 's/ //')

# -z 用于检查字符串是否为空
if [[ -z $conflict_files ]]; then
  echo "未发现待处理文件，正在退出"
  sleep 3
  exit
fi

IFS=$'\n' # 设置IFS为换行符，以便处理文件名中可能包含空格的情况
# 循环处理冲突文件列表
for file in $conflict_files; do
  #  echo "当前文件: $file"
  # 解决冲突
  if [[ $file == "../api/Hona/"* ]]; then
    echo "处理api冲突文件: $file"
    git rm "$file"
  fi
  if [[ $file == "../mobile/hona/"* ]]; then
    echo "处理mobile冲突文件: $file"
    git rm "$file"
  fi
  if [[ $file == "../pc/hona/"* ]]; then
    echo "处理pc冲突文件: $file"
    git rm "$file"
  fi
done
unset IFS # 恢复IFS为默认值

sleep 5
