import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import "./common.css";

@inject("dialog")
@observer
class ImageButton extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.dialog.setImageOpen(true);
  };

  render() {
    return (
      <a id="nice-menu-image-top" className="nice-menu-link" href="#" onClick={this.handleClick}>
        图片
      </a>
    );
  }
}

export default ImageButton;
