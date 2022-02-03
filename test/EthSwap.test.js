import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const Token = artifacts.require('Token');
const EthSwap = artifacts.require('EthSwap');

//configure chai (an assertion library)
require('chai').use(require('chai-as-promised')).should();

function tokens(n) {
  return web3.utils.toWei(n.toString(), 'ether');
}

contract('EthSwap', (accounts) => {
  let ethSwap;
  let token;
  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
  });

  it('Contract has a name', async () => {
    const name = await ethSwap.name();
    assert.equal(name, 'EthSwap');
  });
  it('Has 1 million tokens', async () => {
    const oneMillionTokens = tokens(1000000);

    await token.transfer(ethSwap.address, oneMillionTokens);
    const ethSwapBalance = await token.balanceOf(ethSwap.address);
    assert.equal(ethSwapBalance.toString(), oneMillionTokens);
  });

  describe('buyTokens()', () => {
    let result;
    let investor = accounts[1];
    before(async () => {
      result = await ethSwap.buyTokens({from: investor, value: tokens(1)})
    });
    it('Check that investor received 100 tokens', async () => {
      const investorBalance = await token.balanceOf(investor);
      const ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(investorBalance, tokens(100));
      assert.equal(ethSwapBalance, tokens(1000000 - 100));
    });

    it('Check that ethSwap lost 100 dapp tokens', async () => {
      const ethSwapBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance, tokens(1000000 - 100));
    });

    it('Check that ethSwap gained 1 eth', async () => {
      const ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapBalance, tokens(1));
    });

    it('Purchased Event should fire with proper parameters', async () => {
      const {account, token: dappToken, amount, rate} = result.logs[0].args;

      assert.equal(account, investor);
      assert.equal(dappToken, token.address);
      assert.equal(amount, tokens(100));
      assert.equal(rate, 100);
    });
  });

  describe('sellTokens()', () => {
    let result;
    let investor = accounts[1];
    before(async () => {
      // investor must approve the purchase, i.e allowing the smart contract to spend its funds
      await token.approve(ethSwap.address, tokens(100), {from: investor});
      // Investor sells tokens
      result = await ethSwap.sellTokens(tokens(100), {from: investor})
    });
    it('Allows users to instantly sell tokens to ethswap for a fixed price', async () => {
      // check that investor balance of token went down and eth balance went up
      //  check that ethSwap balance of token went up and eth balance went down

    //  ethswap balance
      const ethSwapTokenBalance = await token.balanceOf(ethSwap.address);
      const ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      // should be back at 1million since we initially bought 100 then we sold 100.
      assert.equal(ethSwapTokenBalance.toString(), tokens(1000000));
      assert.equal(ethSwapBalance.toString(), tokens(0));

      const investorTokenBalance = await token.balanceOf(investor);
      assert.equal(investorTokenBalance, tokens(0))
    });

    it('Sold Event should fire with proper parameters', async () => {
      const {account, token: dappToken, amount, rate} = result.logs[0].args;

      assert.equal(account, investor);
      assert.equal(dappToken, token.address);
      assert.equal(amount, tokens(100));
      assert.equal(rate, 100);
    });

    it('user should not be able to sell more tokens then they have', async() => {
      await ethSwap.sellTokens(tokens(100), {from: investor}).should.be.rejected;
    });
  })

});
