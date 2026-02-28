<div align="center">
  <a href="https://wechat.jeffjade.com/">
    <img width="360" src="https://lovejade.oss-cn-shenzhen.aliyuncs.com/wechat-markdown-logo.svg" alt="公众号 & Markdown 排版" />
  </a>
</div>

<h1 align="center"><a href="https://markdown.mornveil.com/">公众号 & Markdown 排版</a></h1>

## 项目简介

- 支持自定义样式的 Markdown 编辑器
- 支持微信公众号 / 知乎 / 稀土掘金等平台
- Fork 自 [markdown-nice](https://github.com/mdnice/markdown-nice)，可参考[在线版本](https://markdown.mornveil.com/)

## 本仓库改动说明

- **支持直接粘贴网络图片链接**：对于网络图片可直接粘贴地址，不需要上传图片。
- **支持多张图片上传**：对于非网络图片，如本地图片、notion笔记中的图片，需要先通过「图片」弹窗进行上传，可同时选择多张图片上传。

## 安全说明（图床信息是否会泄漏？）

- 不会。图床信息（如 GitHub 用户名、仓库名、token）仅保存在**当前用户浏览器**的 localStorage 中；上传时由浏览器直连 GitHub 等接口。
- 部署方只提供静态页面，不接收、不存储任何图床凭证。
- 建议在公用设备使用后清除站点数据，token 尽量采用 Fine-grained PAT 并只授权图床仓库。

## 本地开发

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

### 构建（生产）

```bash
npm run build
```

## 在线部署

本项目为静态前端，`npm run build` 会产出 `build/` 目录，可部署到任意静态托管平台。

## 图片上传（GitHub 图床）

使用顶栏 **「图片」** 打开上传弹窗，在弹窗内切换图床为 **GitHub** 并配置后即可上传。

### 前置准备

- 在 GitHub 创建一个仓库作为图床（建议公开仓库，配合 jsDelivr 更快）。
- 准备 token：GitHub → Settings → Developer Settings → Personal access tokens
  - Fine-grained PAT：对图床仓库授权 **Contents: Read and write**
  - token 只会在创建时显示一次，请自行妥善保存；丢失需重新生成。

### 使用方式

- 配置完成后，在「图片」弹窗中选择图片上传（可多选）。
- 上传完成后可将图片链接插入编辑器或用于复制粘贴。
