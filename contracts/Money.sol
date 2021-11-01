// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract Money is ERC20PresetMinterPauser {
    uint256 constant initialSupply = 1000 * 10 ** 18;

    constructor() ERC20PresetMinterPauser("Money", "MNY") {
        _mint(msg.sender, initialSupply);   
    }
    
    function mintSome(uint256 amount) public {
        _mint(msg.sender, amount);
    }
    
}