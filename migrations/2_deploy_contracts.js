const Money = artifacts.require("Money");
const MyNFT721 = artifacts.require("MyNFT721");
const Market = artifacts.require("Market");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Money);
  await deployer.deploy(MyNFT721);
  const money = await Money.deployed();
  const myNFT721 = await MyNFT721.deployed();
  //mint 1000 nft721 for tickets.
  //already have 1000 MNY for money
  //console.log(MyNFT721);
  //await MyNFT721.mint(accounts[0]);
  await deployer.deploy(Market, money.address, myNFT721.address);
};
