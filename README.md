<div align="center">
  <a href="https://wechat.jeffjade.com/">
    <img width="360" src="https://lovejade.oss-cn-shenzhen.aliyuncs.com/wechat-markdown-logo.svg" alt="公众号 & Markdown 排版" />
  </a>
</div>

<h1 align="center"><a href="https://wechat.jeffjade.com/?github.com">公众号 & Markdown 排版</a></h1>

## 服务简介

- 支持自定义样式的 Markdown 编辑器；
- 支持微信公众号、知乎、稀土掘金平台；
- Fork 自 [markdown-nice](https://github.com/mdnice/markdown-nice)，支持[在线使用](https://wechat.jeffjade.com/)；

## 本地开发与部署

### 环境要求

- 推荐使用 **Node.js 14 / 16**（过高版本可能导致老依赖安装失败）
- 包管理器：推荐 **npm**（已提供 `yarn.lock`，也可自行安装 `yarn` 使用）

### 本地运行（开发环境）

```bash
# 克隆本仓库（如果还未克隆）
git clone https://github.com/your-name/markdown-nice.git
cd markdown-nice

# 安装依赖（npm 7+ 建议加 --legacy-peer-deps 以兼容旧项目）
npm install --legacy-peer-deps

# 启动本地开发服务器
npm start
```

- 启动成功后，浏览器访问：`http://localhost:3000`
- 如需修改端口，可在启动前设置环境变量，例如：

```bash
PORT=3001 npm start
```

### 生产环境构建

```bash
npm run build
```

- 构建完成后，会在项目根目录生成 `build` 目录
- 将 `build` 目录中的静态文件部署到任意静态服务器（如 Nginx、Vercel、Netlify 等）即可对外提供服务

### 图片上传与插图推荐方式

#### 可直接粘贴图片的网络地址

#### 使用 GitHub 作为图床

1. 在 GitHub 新建一个 **公开仓库**（例如 `image-bed`），专门存放图片。
2. 将图片（例如从 Notion 下载的图片）复制到本地该仓库目录下并提交。
3. 在 GitHub 打开该图片文件页面，复制浏览器地址粘贴即可。

> 注意：如果链接本身需要登录或鉴权（例如私有 Notion 页面），即使经过转换也可能无法在浏览器中直接访问，请优先将图片上传到公开可访问的图床（如上文的 GitHub 公共仓库、七牛云、阿里云等）。
