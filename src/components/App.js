import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Navbar from "./Navbar";
import EthSwap from "./EthSwap";
import { abi as tokenAbi, networks as tokenNetworks } from "../abis/Token.json";
import {
  abi as ethSwapAbi,
  networks as ethSwapNetworks,
} from "../abis/EthSwap.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: "",
      ethBalance: "0",
      token: {},
      tokenBalance: "0",
      ethSwap: {},
      loading: true,
    };

    this.buyTokens = this.buyTokens.bind(this);
    this.sellTokens = this.sellTokens.bind(this);
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.loadToken();
    await this.loadEthSwap();
    this.setState({ loading: false });
  }

  async loadWeb3() {
    //pull ethereum provider from metamask
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Non-ethereum browser detected. You should consider metamask!");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();

    const ethBalance = await web3.eth.getBalance(accounts[0]);

    this.setState({ ethBalance, account: accounts[0] });
  }

  async loadSmartContract(abi, networks) {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    if (!(networkId in networks)) {
      alert("Token not deployed to detected network");
      return;
    }
    return new web3.eth.Contract(abi, networks[networkId].address);
  }

  async loadToken() {
    const token = await this.loadSmartContract(tokenAbi, tokenNetworks);

    const tokenBalance = await token.methods
      .balanceOf(this.state.account)
      .call();
    this.setState({ token, tokenBalance: tokenBalance.toString() });
  }

  async loadEthSwap() {
    const ethSwap = await this.loadSmartContract(ethSwapAbi, ethSwapNetworks);

    this.setState({ ethSwap });
  }

  async buyTokens(ethAmount) {
    this.setState({ loading: true });
    try {
      await this.state.ethSwap.methods
        .buyTokens()
        .send({ from: this.state.account, value: ethAmount });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  async sellTokens(tokenAmount) {
    this.setState({ loading: true });
    try {
      await this.state.token.methods
        .approve(this.state.ethSwap.options.address, tokenAmount)
        .send({ from: this.state.account });

      await this.state.ethSwap.methods
        .sellTokens(tokenAmount)
        .send({ from: this.state.account });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    return this.state.loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "600px" }}
          >
            <EthSwap
              buyTokens={this.buyTokens}
              sellTokens={this.sellTokens}
              ethBalance={this.state.ethBalance}
              tokenBalance={this.state.tokenBalance}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
