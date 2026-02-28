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

## 本仓库修改说明（相对上游 mdnice）

- **雁栖湖主题复制到公众号**：修复「Part 1」等前缀不显示或前面多空白的问题；复制时会将 Part 编号写入标题前缀并加上蓝底白字内联样式，同时隐藏 `h1:before` 伪元素避免占位。
- **右上角导航**：原「逍遥自在轩」等三个链接已移除；改为点击「我的公众号」弹出**公众号二维码**弹窗（图片路径在 `src/utils/constant.js` 的 `WECHAT_QR_IMAGE`，默认 `public/wechat-qr.png`）。
- **顶栏「图片」入口**：「图片」已从「格式」下拉中移出，与「格式」「功能」「查看」「主题」并列显示；点击后仍打开原图床配置与上传弹窗（含 GitHub 图床）。
- **GitHub 图床**：
  - 鉴权：自动区分 Classic PAT（`token` 头）与 Fine-grained PAT（`Bearer` 头）；失败时会按 401/403/409/422 给出具体排查提示。
  - 多图上传：多张图片顺序上传，文件名含随机串避免 409 冲突；上传失败时不再误报「图片上传成功」。

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
- 可直接粘贴图片的网络地址
- GitHub 图床（通过顶栏「图片」使用）
  - 通过顶栏 **「图片」** 打开上传弹窗，在弹窗内将图床切换为 **GitHub** 并配置后，即可上传图片到 GitHub 仓库。
  - 可提前在Github中创建一个空的项目作为图床
  - token的获取方式：github账户 -> Settings -> Developer Settings -> Personal access tokens -> Tokens 可选择仅针对图床项目创建
