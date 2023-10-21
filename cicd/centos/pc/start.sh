#!/bin/bash
cd /usr/share/nginx/html/
sed -i s/setting-prod.js/setting-${ENV}.js/ index.html