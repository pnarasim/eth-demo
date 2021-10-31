// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

//MNY deployed to 0xaCf59bA9AD47E09063D562dbe46eE69433b4bBbD on rinkeby

//admin was by account : 0x2b1a497b540a7EA4c7E0a108072591838106caEe
//granted minting role to : 0x9fAD60038399E2b95F64C80588835924551260a4

//0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6 , 0x9fAD60038399E2b95F64C80588835924551260a4

contract Money is ERC20PresetMinterPauser {
    uint256 constant initialSupply = 1000000000000000000000;

    constructor() ERC20PresetMinterPauser("Money", "MNY") {
        _mint(msg.sender, initialSupply);   
    }
    
    function mintSome(uint256 amount) public {
        _mint(msg.sender, amount);
    }
    
}