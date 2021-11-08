// Addresses got after 
// truffle migrate --network rinkeby
// Money deployed to 	0x23A06E85B0974411e758A3FAE623d1b37569891b on rinkeby
// iter 2 0x15C780E1017f186dB78dcfad3E9bb0BBC8878A6F
// iter 3 0x2B6bea18D5C234d1E120D292A2DaF9dDD0eD517c
// iter 4 0xf3B57D76b89e2D2E896f73f8d67ceeAa33E8CAdC

// Tickets deployed to 0xE45834761eBC5a77D478edfD0BC03513190F8F3b
// iter 2 0xFba154045DAAdb3DD65771e20A51A1a897fA29E6
// iter 3 0xD9c8a67fc8a7328EbD2d0FeD7B2847B3569b619d
// iter 4 0x66ECc41966286F66103118D992fe973bDd16031d

// Market deployed to 0x23A06E85B0974411e758A3FAE623d1b37569891b
// iter 2 0x7Eb974bCFb4BA291c1FAfe32D073983dD294AD6a
// iter 3 0xf0fc9ddE8cdB409d9486161538b651D2064AFaE8
// iter 4 0x495d9B3968C3F03ee1804Bb6C2600bD94CcF52c8

import web3 from "./web3";
import Market from "../build/contracts/Market.json";


const MARKET_ADDRESS = "0x495d9B3968C3F03ee1804Bb6C2600bD94CcF52c8";

const market = new web3.eth.Contract(
        JSON.parse(JSON.stringify(Market.abi)),
        MARKET_ADDRESS
);

export  default market;
