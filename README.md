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

## 友情链接

- [倾城之链](https://nicelinks.site/?ref=wechat.jeffjade.com) ：开放型新一代导航平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；在「倾城之链」，您可以轻松发现、学习、分享更多有用或有趣的事物。
- [曼妙句子](https://read.lovejade.cn/?ref=wechat.jeffjade.com) ：人生最曼妙的风景，是内心的淡定与从容。曼妙句子，旨在云集世间摇曳生姿的文字，或情感、或唯美、或修身、或励志、或哲学、或娱乐，拳拳真情，精心择选，总有荡漾你心的那一言。
- [**玉桃文飨轩**](https://share.lovejade.cn/?ref=wechat.jeffjade.com) ：简单好用的在线文本工具；支持将 Markdown、rich text、word 等格式内容，快速转化为 png、pdf、html、PPT 等文件，并支持一键下载、社交分享、自定义设置等功能。
- [**素问智聊斋**](https://chatgpt.nicelinks.site/) ：非官方 ChatGPT 在线客户端，旨在提供更便捷的 ChatGPT 访问体验；它基于非官方 ChatGPT API、Svelte、TailwindCSS、Vite 和 NodeJS 所搭建；无需账号，零配置，即可与 ChatGPT 畅聊；支持自定义 OPENAI API KEY。
