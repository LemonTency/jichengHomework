#制定node镜像的版本
FROM node:8.4
#复制当前⽬目录下⾯面的⽂文件到app⽬目录下 
COPY . /app
#进⼊入到app⽬目录下⾯面，类似cd 
WORKDIR /app
#安装依赖
RUN npm install
#对外暴暴露露的端⼝口
EXPOSE 3000