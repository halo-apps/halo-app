#!/bin/bash

echo -e '\033[35m8. Executing CD ...[0m'

kubectl delete secret ${domain} #删除老证书
kubectl create secret tls ${domain} --key ./cert/${domain}.key --cert ./cert/${domain}.pem #创建证书，运行中的Ingress也会立马生效

#变量替换文件
awk -F= -v image=${image} '{
  if(NR==1){
    print "#!/bin/bash #说明性描述不可以少"
  }
  else {
    if($1=="image"){
     $2=image
    }
    gsub(/'\''/,"'\''\\'\\\'\\\''",$2) #替换$2值中的单引号为 单引号、反斜线、单引号、单引号，会直接影响$2
    gsub(/\//,"\\/",$2) #替换$2值中的/为\/，会直接影响$2
    gsub(/\$/,"\\$",$2) #替换$2值中的$为\$，会直接影响$2
    gsub(/\&/,"\\\\&",$2) #替换$2值中的&为\&，会直接影响$2
    print "sed -e '\''s/${"$1"}/"$2"/g'\'' -i kubernetes.yaml"
  }
}' ./env/${env}.sh > _temp.sh #会替换掉现有文件

sh _temp.sh
cat _temp.sh

cat kubernetes.yaml
kubectl apply -f kubernetes.yaml #进行k8s部署

#docker run -p 88:80 hona.pc #把本地88端口映射到容器80端口上，并启动容器