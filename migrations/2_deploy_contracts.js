const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = async (deployer) => {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed();

  const totalSupply = (await token.totalSupply()).toString();
  await token.transfer(ethSwap.address, totalSupply);

};
