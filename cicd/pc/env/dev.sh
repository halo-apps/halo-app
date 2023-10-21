#!/bin/bash
env=dev
name=hona-pc-dev
domain=dev.honastar.com
image=registry.cn-shanghai.aliyuncs.com/hona/hona-pc
start='cd /app && sed -i s/setting-prod.js/setting-${ENV}.js/ index.html'