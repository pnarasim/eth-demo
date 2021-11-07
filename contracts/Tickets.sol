// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

// deployed to 


contract Tickets is ERC1155PresetMinterPauser {
    uint256 public constant TICKETS = 0;
    uint256 public constant PRICE=10;
    
    constructor(uint num_tickets)  ERC1155PresetMinterPauser("https://github.com/pnarasim/hohum/blob/main/MelaTicketsERC1155/{id}.json") {
        _mint(msg.sender, TICKETS, num_tickets, "");
    }
    
    function uri(uint256 _tokenId) override pure public  returns (string memory) {
        return string(
            abi.encodePacked(
                "https://github.com/pnarasim/hohum/blob/main/MelaTicketsERC1155/",
                Strings.toString(_tokenId),
                ".json"
                )
            );
    }
    
    
}



