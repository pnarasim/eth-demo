// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

// deployed to 0x2a6926B1541fe7b8E348eB27C2A76796a37ccAAA

contract MyNFT721 is ERC721PresetMinterPauserAutoId {
    constructor() ERC721PresetMinterPauserAutoId("Mela Ticket", "MTK", "https://github.com/pnarasim/hohum/blob/main/MelaTicketsERC1155/0.json" ) {
        
    }

}