import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Modal} from "antd";
import {WECHAT_QR_IMAGE, WECHAT_OFFICIAL_ACCOUNT_LABEL} from "../../utils/constant";

@inject("dialog")
@observer
class WechatQrDialog extends Component {
  handleCancel = () => {
    this.props.dialog.setWechatQrOpen(false);
  };

  render() {
    const {dialog} = this.props;
    return (
      <Modal
        title={WECHAT_OFFICIAL_ACCOUNT_LABEL}
        footer={null}
        visible={dialog.isWechatQrOpen}
        onCancel={this.handleCancel}
        centered
        width={320}
      >
        <div style={{textAlign: "center", padding: "8px 0"}}>
          <img
            src={WECHAT_QR_IMAGE}
            alt="公众号二维码"
            style={{maxWidth: "100%", height: "auto", display: "block", margin: "0 auto"}}
          />
          <p style={{marginTop: 12, color: "#666", fontSize: 14}}>微信扫码关注</p>
        </div>
      </Modal>
    );
  }
}

export default WechatQrDialog;
