import React, { Component } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

class EthSwap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "buy",
    };
  }

  setMode(mode) {
    this.setState({ mode });
  }

  render() {
    const { buyTokens, sellTokens, ethBalance, tokenBalance } = this.props;

    return (
      <>
        <div className="d-flex justify-content-between ">
          <button className="btn btn-light" onClick={() => this.setMode("buy")}>
            BUY
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
            className="btn btn-light"
            onClick={() => this.setMode("sell")}
          >
            SELL
          </button>
        </div>
        {this.state.mode === "buy" ? (
          <BuyForm
            buyTokens={buyTokens}
            ethBalance={ethBalance}
            tokenBalance={tokenBalance}
          />
        ) : (
          <SellForm
            sellTokens={sellTokens}
            ethBalance={ethBalance}
            tokenBalance={tokenBalance}
          />
        )}
      </>
    );
  }
}

export default EthSwap;
