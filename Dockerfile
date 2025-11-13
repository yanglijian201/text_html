# 第一阶段：构建 React 应用
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖（包括 devDependencies，因为构建需要）
RUN npm install

# 复制所有文件
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：使用 Nginx 托管构建后的应用
FROM nginx:alpine

# 删除默认的 nginx 配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义的 nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/

# 从构建阶段复制构建好的文件到 nginx 目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露 8443 端口
EXPOSE 8443

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
