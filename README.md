# eth-demo
## Marketplace for selling ERC1155 items for ERC20 tokens.

This project demonstrates a simple marketplace where NFT tickets adhering to the ERC1155 standard can be bought and sold in exchange for a fixed number of ERC20 fungible tokens.

Features like royalties etc have not been incorporated. But users can buy and sell their tickets any number of times via the marketplace.

## To run:

+ git clone https://github.com/pnarasim/eth-demo.git
+ git checkout master.
+ docker-compose up

Follow the links to get the ERC20 tokens, buy or sell the ERC1155 tickets or view balances of anyone who has bought tickets so far.


## To make changes to the code and run

- git clone https://github.com/pnarasim/eth-demo.git
- git checkout master.
- npm install truffle
- npm install
- truffle compile //if making changes to the contracts
- npm run dev // starts a server at localhost:3000
