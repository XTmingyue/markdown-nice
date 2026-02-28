import React, {Component} from "react";
import {Upload, message} from "antd";

import {GITHUB_IMAGE_HOSTING} from "../utils/constant";
import {githubUpload} from "../utils/imageHosting";

class TopImageUploadBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadingCount: 0,
      hasSuccess: false,
      queue: [],
      processing: false,
    };
  }

  enqueueFile = (file) => {
    this.setState(
      (prev) => ({
        queue: prev.queue.concat(file),
      }),
      () => {
        if (!this.state.processing) {
          this.processNext();
        }
      },
    );
  };

  processNext = () => {
    this.setState((prev) => {
      if (prev.processing || prev.queue.length === 0) {
        return null;
      }
      const [file, ...rest] = prev.queue;
      this.uploadFile(file);
      return {
        queue: rest,
        processing: true,
      };
    });
  };

  uploadFile = (file) => {
    let config;
    try {
      config = JSON.parse(window.localStorage.getItem(GITHUB_IMAGE_HOSTING));
    } catch (e) {
      config = null;
    }
    if (!config || !config.username || !config.repo || !config.token) {
      const err = new Error("请先配置 GitHub 图床（用户名/仓库名/token）");
      message.error(err.message);
      this.setState({
        processing: false,
      });
      return;
    }

    this.setState((prev) => ({
      uploadingCount: prev.uploadingCount + 1,
    }));

    const images = [];
    githubUpload({
      file,
      onProgress: () => {},
      onSuccess: () => {
        this.setState((prev) => {
          const next = Math.max(prev.uploadingCount - 1, 0);
          return {
            uploadingCount: next,
            hasSuccess: true,
            processing: false,
          };
        }, this.processNext);
      },
      onError: () => {
        this.setState(
          (prev) => ({
            uploadingCount: Math.max(prev.uploadingCount - 1, 0),
            processing: false,
          }),
          this.processNext,
        );
      },
      images,
    });
  };

  renderStatus() {
    const {uploadingCount, hasSuccess} = this.state;
    if (uploadingCount > 0) {
      return <span className="nice-top-upload-status nice-top-upload-status-uploading">上传中...</span>;
    }
    if (hasSuccess) {
      return <span className="nice-top-upload-status nice-top-upload-status-success">✔ 上传成功</span>;
    }
    return null;
  }

  render() {
    return (
      <div className="nice-top-upload">
        <Upload
          name="file"
          multiple
          accept="image/*"
          showUploadList={false}
          beforeUpload={(file) => {
            this.enqueueFile(file);
            return false; // 阻止 antd 自动上传，改为顺序上传
          }}
        >
          <span className="nice-menu-link">上传图片</span>
        </Upload>
        {this.renderStatus()}
      </div>
    );
  }
}

export default TopImageUploadBar;
