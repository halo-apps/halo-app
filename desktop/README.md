# 开发教程

注意:
1. tauri的productName不能包含.，否则编译报错
2. pnpm install：
   1. 执行失败（prebuild-install warn install read ECONNRESET），则临时移除@tauri-apps/tauricon
3. 启动 npm run tauri:dev
   4. 报错：failed to get cargo metadata: program not found -->> 说明rust安装不完整，需要检查
4. API发布文化被占用导致发布失败，执行：taskkill /F /IM Hona*
