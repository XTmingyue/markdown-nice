import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import classnames from "classnames";

import {WECHAT_OFFICIAL_ACCOUNT_LABEL} from "../utils/constant";
import File from "../component/MenuLeft/File";
import Pattern from "../component/MenuLeft/Pattern";
import ImageButton from "../component/MenuLeft/ImageButton";
import Function from "../component/MenuLeft/Function";
import Theme from "../component/MenuLeft/Theme";
import CodeTheme from "../component/MenuLeft/CodeTheme";
import Setting from "../component/MenuLeft/Setting";
import View from "../component/MenuLeft/View";

import "./Navbar.css";

@inject("view")
@inject("dialog")
@observer
class Navbar extends Component {
  render() {
    const {title, token} = this.props;
    const {isImmersiveEditing} = this.props.view;
    const {dialog} = this.props;
    const niceNavbarClass = classnames({
      "nice-navbar": true,
      "nice-navbar-hide": isImmersiveEditing,
    });
    return (
      <div className={niceNavbarClass}>
        <div className="nice-left-nav">
          {title === "" ? null : (
            <section id="nice-title" className="nice-title">
              {title}
            </section>
          )}
          <File />
          <Pattern />
          <ImageButton />
          <Function />
          <View />
          <Theme token={token} />
          <CodeTheme />
          <Setting />
        </div>
        <div className="nice-right-nav">
          <span
            className="nice-title nice-link"
            role="button"
            tabIndex={0}
            onClick={() => dialog.setWechatQrOpen(true)}
            onKeyDown={(e) => e.key === "Enter" && dialog.setWechatQrOpen(true)}
          >
            {WECHAT_OFFICIAL_ACCOUNT_LABEL}
          </span>
        </div>
      </div>
    );
  }
}

export default Navbar;
