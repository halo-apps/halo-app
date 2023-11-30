#!/bin/bash

function str_replace() {
  local file=$1
  local old=$2
  local new=$3
  sed -i '' "s/${old}/${new}/g" $file
}