const Money = artifacts.require("Money");
//const MyNFT721 = artifacts.require("MyNFT721");
const Tickets = artifacts.require("Tickets");
const Market = artifacts.require("Market");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Money);
  await deployer.deploy(Tickets, 1000);
  const money = await Money.deployed();
  const myTickets = await Tickets.deployed();
  //mint 1000 nft721 for tickets.
  //already have 1000 MNY for money
  //console.log(MyNFT721);
  //await MyNFT721.mint(accounts[0]);
  await deployer.deploy(Market, money.address, myTickets.address);
};
