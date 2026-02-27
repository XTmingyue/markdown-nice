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

#### 使用 GitHub 作为图床

1. 在 GitHub 新建一个 **公开仓库**（例如 `image-bed`），专门存放图片。
2. 将图片（例如从 Notion 下载的图片）复制到本地该仓库目录下并提交。
3. 在 GitHub 打开该图片文件页面，复制浏览器地址（形如  
   `https://github.com/your-name/image-bed/blob/master/notion/your-image.png`），
   然后直接在编辑器左侧**单独一行**粘贴即可。

#### 自动识别与链接转换说明

- 当一行中只有一个 `http(s)` 链接时，编辑器会自动尝试：
  - 识别是否是图片地址（包含 `.png` / `.jpg` / `.jpeg` / `.gif` / `.webp` / `.bmp` / `.svg` 等关键字），
  - 将其转换为 Markdown 图片语法 `![](url)` 并在右侧预览展示。
- 对于 GitHub 图片链接，支持自动将 **网页地址（blob 链接）** 转换为 **直链**，例如：
  - 输入：`https://github.com/your-name/image-bed/blob/master/path/img.png`
  - 实际渲染时会自动转换为：`https://raw.githubusercontent.com/your-name/image-bed/master/path/img.png`

> 注意：如果链接本身需要登录或鉴权（例如私有 Notion 页面），即使经过转换也可能无法在浏览器中直接访问，请优先将图片上传到公开可访问的图床（如上文的 GitHub 公共仓库、七牛云、阿里云等）。

## 友情链接

- [倾城之链](https://nicelinks.site/?ref=wechat.jeffjade.com) ：开放型新一代导航平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；在「倾城之链」，您可以轻松发现、学习、分享更多有用或有趣的事物。
- [曼妙句子](https://read.lovejade.cn/?ref=wechat.jeffjade.com) ：人生最曼妙的风景，是内心的淡定与从容。曼妙句子，旨在云集世间摇曳生姿的文字，或情感、或唯美、或修身、或励志、或哲学、或娱乐，拳拳真情，精心择选，总有荡漾你心的那一言。
- [**玉桃文飨轩**](https://share.lovejade.cn/?ref=wechat.jeffjade.com) ：简单好用的在线文本工具；支持将 Markdown、rich text、word 等格式内容，快速转化为 png、pdf、html、PPT 等文件，并支持一键下载、社交分享、自定义设置等功能。
- [**素问智聊斋**](https://chatgpt.nicelinks.site/) ：非官方 ChatGPT 在线客户端，旨在提供更便捷的 ChatGPT 访问体验；它基于非官方 ChatGPT API、Svelte、TailwindCSS、Vite 和 NodeJS 所搭建；无需账号，零配置，即可与 ChatGPT 畅聊；支持自定义 OPENAI API KEY。
