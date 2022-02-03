import React, { Component } from "react";
import Identicon from "identicon.js";

class Navbar extends Component {
  render() {
    const identicon = this.props.account
      ? `data:image/png;base64,${new Identicon(
          this.props.account,
          30
        ).toString()}`
      : "";
    return (
      <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          EthSwap
        </a>
        <div className="row mr-2">
          <img className="mr-1" width="30" height="30" src={identicon} alt="" />
          <p className="text-white-50">{this.props.account}</p>
        </div>
      </nav>
    );
  }
}

export default Navbar;
