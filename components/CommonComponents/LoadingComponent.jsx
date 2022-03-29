import React, { Component } from "react";

import Lottie from "react-lottie";
import * as progress_bar from "./progress_bar.json";

class LoadingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }
  render() {
    let { type, loadingMessage } = this.props;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: progress_bar.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <div className="LoadingComponent">
        <Lottie options={defaultOptions} height={400} width={400} loop={true} autoplay={true} isStopped={this.state.isStopped} isPaused={this.state.isPaused} />
      </div>
    );
  }
}

export default LoadingComponent;
