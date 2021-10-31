// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

//open trade by sending nft from owner to contract address of this Classifieds

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
/**
 * @title Classifieds
 * @notice Implements the classifieds board market. The market will be governed
 * by an ERC20 token as currency, and an ERC721 token that represents the
 * ownership of the items being traded. Only ads for selling items are
 * implemented. The item tokenization is responsibility of the ERC721 contract
 * which should encode any item details.
 */
 
 //deployed to 0x2Bfd917d44be90013B639bfA6B8b3F4dd385B3d0
contract Market is IERC721Receiver {
    event TradeStatusChange(uint256 ad, bytes32 status);

    IERC20 public currencyToken;
    IERC721 public itemToken;

    struct Trade {
        address poster;
        uint256 item;
        uint256 price;
        bytes32 status; // Open, Executed, Cancelled
    }

    mapping(uint256 => Trade) public trades;

    uint256 tradeCounter;
    //MNY deployed to 0xaCf59bA9AD47E09063D562dbe46eE69433b4bBbD
    //MTKT (bft721) deployed to 0x2a6926B1541fe7b8E348eB27C2A76796a37ccAAA
    //(0xaCf59bA9AD47E09063D562dbe46eE69433b4bBbD, 0x2a6926B1541fe7b8E348eB27C2A76796a37ccAAA)
    constructor (address _currencyTokenAddress, address _itemTokenAddress)
        public
        
    {
        currencyToken = IERC20(_currencyTokenAddress);
        itemToken = IERC721(_itemTokenAddress);
        tradeCounter = 0;
    }

    /**
     * @dev Returns the details for a trade.
     * @param _trade The id for the trade.
     */
    function getTrade(uint256 _trade)
        public
        virtual
        view
        returns(address, uint256, uint256, bytes32)
    {
        Trade memory trade = trades[_trade];
        return (trade.poster, trade.item, trade.price, trade.status);
    }

    /**
     * @dev Opens a new trade. Puts _item in escrow.
     * @param _item The id for the item to trade.
     * @param _price The amount of currency for which to trade the item.
     */
    function openTrade(uint256 _item, uint256 _price)
        public
        virtual
    {
        //before you transfer, ensure that the nft has been approved to be transferred to this contract.
        //itemToken.approve(address(this), _item);
        itemToken.transferFrom(msg.sender, address(this), _item);
        
        trades[tradeCounter] = Trade({
            poster: msg.sender,
            item: _item,
            price: _price,
            status: "Open"
        });
        tradeCounter += 1;
        emit TradeStatusChange(tradeCounter - 1, "Open");
    }

    /**
     * @dev Executes a trade. Must have approved this contract to transfer the
     * amount of currency specified to the poster. Transfers ownership of the
     * item to the filler.
     * @param _trade The id of an existing trade
     */
    function executeTrade(uint256 _trade)
        public
        virtual
    {
        Trade memory trade = trades[_trade];
        require(trade.status == "Open", "Trade is not Open.");
        currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
        //approve the buyer to buy this token.
        itemToken.approve(msg.sender, _trade);
        itemToken.transferFrom(address(this), msg.sender, trade.item);
        trades[_trade].status = "Executed";
        emit TradeStatusChange(_trade, "Executed");
    }

    /**
     * @dev Cancels a trade by the poster.
     * @param _trade The trade to be cancelled.
     */
    function cancelTrade(uint256 _trade)
        public
        virtual
    {
        Trade memory trade = trades[_trade];
        require(
            msg.sender == trade.poster,
            "Trade can be cancelled only by poster."
        );
        require(trade.status == "Open", "Trade is not Open.");
        itemToken.transferFrom(address(this), trade.poster, trade.item);
        trades[_trade].status = "Cancelled";
        emit TradeStatusChange(_trade, "Cancelled");
    }
    
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) override external returns (bytes4) {
        
        return (this.onERC721Received.selector);
    }
}