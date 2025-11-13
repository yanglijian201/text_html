# HTML 验证和预览工具

这是一个基于 React 的 HTML 验证和预览工具。用户可以输入 HTML 代码，工具会自动验证其有效性，并在验证通过后展示渲染效果。

## 功能特性

- ✅ 实时 HTML 验证
- ✅ 有效 HTML 的实时预览
- ✅ 友好的错误提示
- ✅ 简洁的用户界面
- ✅ 一键清空功能

## 技术栈

- React 18
- JavaScript (ES6+)
- CSS3
- DOMParser API

## 安装和运行

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

## 使用说明

1. 在文本输入框中输入 HTML 代码
2. 工具会自动验证 HTML 的有效性
3. 如果 HTML 有效，下方会显示✅标识和渲染后的效果
4. 如果 HTML 无效，会显示❌标识和错误提示信息
5. 点击"清空"按钮可以清除所有内容

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