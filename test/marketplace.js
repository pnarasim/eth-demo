//import web3 from '../ethereum/web3';

const Money = artifacts.require("../contracts/Money.sol");
const MyNFT721 = artifacts.require("../contracts/MyNFT721.sol");
const Market = artifacts.require("../contracts/Market.sol");

/*contract("Money and NFT and Market", accounts => {
	it("Should deploy with some money and some NFT and the Market", async () => {
		const money = await Money.deployed();
		assert.ok(money);
		console.log("Money deployed");
		const myNFT721 = await MyNFT721.deployed();
		assert.ok(myNFT721);
		console.log("NFT721 deployed");
		const market = await Market.deployed();
		assert.ok(market);
		console.log("Market ready");
		let nftbal = await myNFT721.balanceOf(accounts[0]);
		let moneybal = await money.balanceOf(accounts[0]);
		console.log(web3.utils.fromWei(nftbal, "ether"), web3.utils.fromWei(moneybal, "ether"));
		//const  initialSupply = web3.utils.toBN(String(totalSupply) + "0".repeat(decimalPrecision));
		//const balance = await money.balanceOf(accounts[0]).call();
		//assert.equal(balance, initialSupply);

	});
});


contract("Money", accounts => {
  it("should put 10000 MNY in the first account", () =>
    Money.deployed()
      .then(instance => instance.balanceOf.call(accounts[0]))
      .then(balance => {
        console.log("Balance in accounts[0]", accounts[0], " is = ", web3.utils.fromWei(balance, "ether"));
        assert.equal(
          web3.utils.fromWei(balance, "ether"),
          1000,
          "1000 wasn't in the first account"

        );
      }));
});
*/

/* TEMP : all this works so no need to keep testing
contract("Test Money", async accounts => {
	it("Creates MNY and puts it in accounts[0]", async () => {
			const instance = await Money.deployed();
			const balance = await instance.balanceOf(accounts[0]);
			assert.equal(web3.utils.fromWei(balance, "ether"), 1000);
		});
	it("Can send some MNY to a friend to buy tickets", async () => {
		const instance = await Money.deployed();
		await instance.approve(accounts[1],10);
		await instance.transfer(accounts[1], 10);
		const A1_bal = await instance.balanceOf(accounts[0]);
		const A2_bal = await instance.balanceOf(accounts[1]);
		console.log(" Balances of account 1 and 2 ", web3.utils.fromWei(A1_bal, "ether"), web3.utils.fromWei(A2_bal, "ether"));
	});
})

contract("Test MyNFT721", async accounts => {
	it("Accesses Mela Ticket ", async () => {
			const instance = await MyNFT721.deployed();
			const balance = await instance.balanceOf.call(accounts[0]);
			assert.equal(web3.utils.fromWei(balance, "ether"), 0);
		});
	it(" Can mint some tickets and send it to accounts[0]", async () => {
		const instance = await MyNFT721.deployed();
		const result = await instance.mint(accounts[0]);
		const totsupply = await instance.totalSupply();
		const nftbal = await instance.balanceOf(accounts[0]);
		console.log(" ttal supply of nft is ", totsupply.toNumber());
		console.log(" accounts[0] has ", nftbal.toNumber());
	});
})
*/

contract("test market and open and execute a trade", async accounts => {
	let market;
	let money;
	let myNFT721;

	it("Created the marketplace, created 3 NFTs, and distributed some MNY", async () =>{
		market = await Market.deployed();
		money = await Money.deployed();
		myNFT721 = await MyNFT721.deployed();

		await money.approve(accounts[0], 100000000);
		await money.approve(accounts[1],1000000);
		await money.transfer(accounts[1], 10000);

		await money.approve(accounts[2],1000000);
		await money.transfer(accounts[2], 1000);
		
		await money.approve(market.address, 10000);

		const A0_bal = await money.balanceOf(accounts[0]);
		const A1_bal = await money.balanceOf(accounts[1]);
		const A2_bal = await money.balanceOf(accounts[2]);
		console.log(" Balances of account 0, 1 and 2 ", web3.utils.fromWei(A0_bal, "ether"), web3.utils.fromWei(A1_bal, "ether"), web3.utils.fromWei(A2_bal, "ether"));

		const market_money = await market.currencyToken;
		const market_nft = await market.itemToken;

		const totsupply = await myNFT721.totalSupply();
		console.log(" total supply of nft is ", totsupply.toNumber());
		await myNFT721.setApprovalForAll(market.address, true);
		console.log("approved market place for receiving all trades");
		
		const result0 = await myNFT721.mint(accounts[0]);
		const result1 = await myNFT721.mint(accounts[1]);
		const result2 = await myNFT721.mint(accounts[2]);

		const nftbal0 = await myNFT721.balanceOf(accounts[0]);
		const nftbal1 = await myNFT721.balanceOf(accounts[1]);
		const nftbal2 = await myNFT721.balanceOf(accounts[2]);
		console.log(" accounts 0, 1, 2  have ", nftbal0.toNumber(), nftbal1.toNumber(), nftbal2.toNumber());
		const totsupplyAfter = await myNFT721.totalSupply();
		console.log(" NOW: total supply of nft is ", totsupplyAfter.toNumber());
		
		
		await market.openTrade(0, 1000, {from: accounts[0]});
		console.log("OPened trade for item 0 at price 100");
		let poster, item, price, status, result;
		result = await market.getTrade(0);
		console.log(" Got trade -", result[0], result[1], result[2], result[3].toString());
		//await myNFT721.approve()
		//buyer is accounts[1], so he sends the erc20 and receives the erc721
		await money.increaseAllowance(market.address, 1000, {from: accounts[1]});
		await market.executeTrade(0, {from: accounts[1]});
		console.log(" executed trade by accounts[1]");
		const newnftbal1 = await myNFT721.balanceOf(accounts[1]);
		console.log("now accounts[1] has ", newnftbal1.toNumber());
		const newbal1 = await money.balanceOf(accounts[1]);
		const newbal0 = await money.balanceOf(accounts[0]);
		console.log(" accounts 0 = ", web3.utils.fromWei(newbal0, "ether"), " of 1 = ", web3.utils.fromWei(newbal1, "ether"));

	});
})

