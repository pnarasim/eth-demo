import Web3 from "web3";
  
let web3;

//web3 = new Web3(Web3.givenProvider ||
  //    new Web3.providers.HttpProvider(
    //    "https://rinkeby.infura.io/v3/77ac482bf94b4dec95e4b6c26e2d2027"
      //)
//);

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
  
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/77ac482bf94b4dec95e4b6c26e2d2027"
  );
  web3 = new Web3(provider);
}
 
export default web3;
