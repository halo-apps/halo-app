#!/bin/bash

source ../../shells/str_replace.sh

# cd ../../../pc/hona

# str_replace "package.json" "version" "image"


json_file="package.json"
json_content=$(cat $json_file)

# 当前版本号
current_version="1.2.22"

# 新版本号
new_version="2.0.0"

new_json_content=$(echo "$json_content" | sed "s/\"version\": \"[0-9]+\.[0-9]+\.[0-9]+\"/\"version\": \"$new_version\"/")

# 输出更新后的 JSON 内容
echo "$new_json_content" > "$json_file"

# # 提取版本号的正则
# version_pattern='\"version\":\ \"([0-9]+\.[0-9]+\.([0-9]+))\"'

# if [[ $json_content =~ $version_pattern ]]; then
#     # 提取匹配到的版本号
#     current_version="${BASH_REMATCH[2]}"
#     echo "Found version: $current_version"
# else
#     echo "Version not found in JSON."
# fi

# # 使用 sed 替换版本号
# new_json_content=$(echo "$json_content" | sed "s/\"version\": \"[0-9]+\.[0-9]+\.[0-9]+\"/\"version\": \"$new_version\"/")

# echo "$new_json_content" > "$json_file"