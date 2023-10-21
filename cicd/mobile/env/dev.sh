#!/bin/bash #说明性描述不可以少
env=dev
name=hona-mobile-dev
domain=mobile-dev.honastar.com
image=registry.cn-shanghai.aliyuncs.com/hona/hona-mobile
start='cd /app && sed -i s/setting-prod.js/setting-${ENV}.js/ index.html'