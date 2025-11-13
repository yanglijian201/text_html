# HTML 验证和预览工具

这是一个基于 React 的 HTML 验证和预览工具。用户可以输入 HTML 代码，工具会自动验证其有效性，并在新标签页中展示渲染效果。

## 功能特性

- ✅ 实时 HTML 验证
- ✅ 新标签页预览渲染效果
- ✅ 友好的错误提示
- ✅ 简洁的用户界面
- ✅ 一键清空功能
- ✅ Docker 容器化部署
- ✅ Nginx 高性能服务

## 技术栈

- React 18
- JavaScript (ES6+)
- CSS3
- DOMParser API
- Nginx (生产环境)
- Docker

## 本地开发

### 前置要求

- Node.js (版本 14 或更高)
- npm 或 yarn

### 安装步骤

1. 克隆或下载项目到本地

2. 进入项目目录：
```bash
cd text_html
```

3. 安装依赖：
```bash
npm install
```

4. 启动开发服务器：
```bash
npm start
```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## Docker 部署

### 在 Mac 上构建多架构镜像

如果你使用的是 Mac（特别是 Apple Silicon M1/M2/M3），需要为 Intel/AMD64 架构构建镜像：

#### 快速构建命令（推荐）

```bash
# 禁用 BuildKit 并构建 Intel/AMD64 架构镜像
DOCKER_BUILDKIT=0 docker build --platform linux/amd64 -t text_html:latest .

# 运行容器
docker run -d -p 8443:8443 --name html-validator-app text_html:latest

# 查看日志
docker logs -f html-validator-app

# 访问应用
open http://localhost:8443
```

#### 方法 1：使用 --platform 参数（推荐）

```bash
# 为 Intel/AMD64 架构构建（禁用 BuildKit）
DOCKER_BUILDKIT=0 docker build --platform linux/amd64 -t text_html:latest .

# 运行容器
docker run -d -p 8443:8443 --name html-validator-app text_html:latest
```

#### 方法 2：使用 buildx 构建多架构镜像

```bash
# 创建并使用新的 builder（首次使用）
docker buildx create --name multiarch-builder --use

# 启动 builder
docker buildx inspect --bootstrap

# 构建多架构镜像（同时支持 ARM64 和 AMD64）
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t html-validator:latest \
  --load \
  .

# 或者只构建 AMD64 架构
docker buildx build \
  --platform linux/amd64 \
  -t html-validator:latest \
  --load \
  .
```

#### 方法 3：推送到 Docker Hub（支持多架构）

```bash
# 登录 Docker Hub
docker login

# 构建并推送多架构镜像
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t your-dockerhub-username/html-validator:latest \
  --push \
  .

# 在其他机器上拉取
docker pull your-dockerhub-username/html-validator:latest
```

### 使用 Docker 构建和运行

1. **构建 Docker 镜像：**
```bash
# 标准构建
docker build -t text_html:latest .

# 或在 Mac 上为 Intel CPU 构建
DOCKER_BUILDKIT=0 docker build --platform linux/amd64 -t text_html:latest .
```

2. **运行容器：**
```bash
docker run -d -p 8443:8443 --name html-validator-app text_html:latest
```

3. **访问应用：**
打开浏览器访问 [http://localhost:8443](http://localhost:8443)

4. **查看容器日志：**
```bash
docker logs -f html-validator-app
```

5. **停止容器：**
```bash
docker stop html-validator-app
```

6. **删除容器：**
```bash
docker rm html-validator-app
```

### 使用 Docker Compose

1. **启动服务：**
```bash
docker-compose up -d
```

2. **查看日志：**
```bash
docker-compose logs -f
```

3. **停止服务：**
```bash
docker-compose down
```

4. **重新构建并启动：**
```bash
docker-compose up -d --build
```

### Docker 镜像说明

- **基础镜像**：Node 18 Alpine (构建阶段) + Nginx Alpine (运行阶段)
- **暴露端口**：8443
- **健康检查**：可通过 `/health` 端点检查服务状态
- **多阶段构建**：优化镜像大小，减少安全风险
- **镜像大小**：约 50MB（优化后）

### 生产环境部署建议

#### 1. 基础部署
```bash
docker run -d \
  -p 8443:8443 \
  --name html-validator-app \
  --restart unless-stopped \
  html-validator:latest
```

#### 2. 资源限制部署
```bash
docker run -d \
  -p 8443:8443 \
  --name html-validator-app \
  --memory="512m" \
  --cpus="1.0" \
  --restart unless-stopped \
  html-validator:latest
```

#### 3. 自定义 Nginx 配置
```bash
docker run -d \
  -p 8443:8443 \
  -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf:ro \
  --name html-validator-app \
  --restart unless-stopped \
  html-validator:latest
```

#### 4. 使用 HTTPS（推荐生产环境）

修改 `nginx.conf` 添加 SSL 配置：

```nginx
server {
    listen 8443 ssl http2;
    listen [::]:8443 ssl http2;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # ... 其他配置
}
```

运行容器时挂载证书：
```bash
docker run -d \
  -p 8443:8443 \
  -v $(pwd)/ssl:/etc/nginx/ssl:ro \
  -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf:ro \
  --name html-validator-app \
  --restart unless-stopped \
  html-validator:latest
```

## 使用说明

1. 在文本输入框中输入 HTML 代码
2. 工具会自动验证 HTML 的有效性
3. 如果 HTML 有效，会显示 ✅ 标识
4. 点击"在新标签页预览"按钮，HTML 将在新窗口中渲染
5. 如果 HTML 无效，会显示 ❌ 标识和错误提示信息
6. 点击"清空"按钮可以清除所有内容

### 示例 HTML

**有效的 HTML 示例：**
```html
<div>
  <h1>Hello World</h1>
  <p>这是一个段落</p>
  <ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
  </ul>
</div>
```

```html
<div style="padding: 20px; background-color: #f0f0f0;">
  <h2 style="color: #333;">带样式的标题</h2>
  <p style="font-size: 16px;">这是一个带内联样式的段落</p>
</div>
```

**无效的 HTML 示例：**
```html
<div>
  <h1>未闭合的标签
  <p>另一个未闭合的标签
</div>
```

## 项目结构

```
text_html/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── App.js              # 主应用组件
│   ├── App.css             # 应用样式
│   ├── index.js            # React 入口文件
│   └── index.css           # 全局样式
├── .gitignore              # Git 忽略文件
├── package.json            # 项目配置和依赖
└── README.md              # 项目说明文档
```

## 可用脚本

在项目目录中，你可以运行：

### `npm start`

在开发模式下运行应用。
打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

页面会在你进行编辑时自动重新加载。

### `npm run build`

将应用构建到 `build` 文件夹中，用于生产环境。
它会正确地打包 React 并优化构建以获得最佳性能。

### `npm test`

启动测试运行器（如果配置了测试）。

## 实现原理

### HTML 验证

本工具使用浏览器原生的 `DOMParser` API 来验证 HTML：

```javascript
const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const parseErrors = doc.querySelectorAll('parsererror');
```

- 如果 HTML 格式正确，`parseErrors` 长度为 0
- 如果 HTML 格式错误，`parseErrors` 会包含错误信息

### HTML 渲染

使用 React 的 `dangerouslySetInnerHTML` 属性来渲染验证通过的 HTML：

```javascript
<div dangerouslySetInnerHTML={{ __html: htmlInput }} />
```

## 安全说明

⚠️ **重要提示**：本项目使用 `dangerouslySetInnerHTML` 来渲染用户输入的 HTML。

在生产环境中部署时，建议：
- 添加 HTML 清理库（如 DOMPurify）
- 实施 Content Security Policy (CSP)
- 对用户输入进行严格的安全检查
- 防止 XSS（跨站脚本攻击）

示例（使用 DOMPurify）：
```bash
npm install dompurify
```

```javascript
import DOMPurify from 'dompurify';

const sanitizedHTML = DOMPurify.sanitize(htmlInput);
```

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 未来改进

- [ ] 添加 HTML 语法高亮
- [ ] 添加常用 HTML 模板
- [ ] 支持导出 HTML 文件
- [ ] 添加 HTML 格式化功能
- [ ] 支持 CSS 和 JavaScript 注入
- [ ] 添加深色模式

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

如果你发现任何问题或有改进建议，请：
1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 作者

你的名字

## 致谢

- React 团队
- Create React App