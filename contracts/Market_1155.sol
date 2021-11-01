// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

//open trade by sending nft from owner to contract address of this Market
//execute trade by sending the required amount of erc20 from buyer to seller via contract
//transfer the nft to the buyer from the market

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

/**
 * @title Market
 * @notice Implements the market. The market will be governed
 * by an ERC20 token as currency, and an ERC1155 token that represents the
 * ownership of the items being traded. Only ads for selling items are
 * implemented. The item tokenization is responsibility of the ERC1155 contract
 * which should encode any item details.
 */
 
 
contract Market is IERC1155Receiver {
    event TradeStatusChange(uint256 ad, bytes32 status);

    IERC20 public currencyToken;
    IERC1155 public itemToken;

    
    struct Trade {
        address poster;
        uint256 item;
        uint256 amount;
        uint256 price;
        bytes32 status; // Open, Executed, Cancelled
    }

    mapping(uint256 => Trade) public trades;

    uint256 tradeCounter;
    
    constructor (address _currencyTokenAddress, address _itemTokenAddress)
        public
        
    {
        currencyToken = IERC20(_currencyTokenAddress);
        itemToken = IERC1155(_itemTokenAddress);
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
        returns(address, uint256, uint256, uint256, bytes32)
    {
        Trade memory trade = trades[_trade];
        return (trade.poster, trade.item, trade.amount, trade.price, trade.status);
    }

    /**
     * @dev Opens a new trade. Puts _item in escrow.
     * @param _item The id for the item to trade.
     * @param _price The amount of currency for which to trade the item.
     */
    function openTrade(uint256 _item, uint256 _amount, uint256 _price)
        public
        virtual
    {
        //before you transfer, ensure that the nft has been approved to be transferred to this contract.
        //thats done from the calling contract
        itemToken.safeTransferFrom(msg.sender, address(this), _item, _amount, "0x00");
        
        trades[tradeCounter] = Trade({
            poster: msg.sender,
            item: _item,
            amount: _amount,
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
        itemToken.setApprovalForAll(msg.sender, true);
        itemToken.safeTransferFrom(address(this), msg.sender, trade.item, trade.amount, "0x00");
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
        itemToken.safeTransferFrom(address(this), trade.poster, trade.item, trade.amount, "0x00");
        trades[_trade].status = "Cancelled";
        emit TradeStatusChange(_trade, "Cancelled");
    }
    
    
    /*
     * @dev Returns the details for a trade.
     * @param _trade The id for the trade.
     */
    /*function getTrade1155(uint256 _trade)
        public
        virtual
        view
        returns(address, uint256, uint256, uint256, bytes32)
    {
        Trade1155 memory trade = trades1155[_trade];
        return (trade.poster, trade.item, trade.amount, trade.price, trade.status);
    }
*/
    /*
     * @dev Opens a new trade. Puts _item in escrow.
     * @param _item The id for the item to trade.
     * @param _price The amount of currency for which to trade the item.
     */
  /*  function openTrade1155(uint256 _item, uint256 _amount, uint256 _price)
        public
        virtual
    {
        //before you transfer, ensure that the nft has been approved to be transferred to this contract.
        //thats done from the calling contract
        item1155Token.safeTransferFrom(msg.sender, address(this), _item, _amount, "0x00");
        
        trades1155[trade1155Counter] = Trade1155({
            poster: msg.sender,
            item: _item,
            price: _price,
            amount: _amount,
            status: "Open"
        });
        trade1155Counter += 1;
        emit TradeStatusChange(trade1155Counter - 1, "Open");
    }
*/
    /*
     * @dev Executes a trade. Must have approved this contract to transfer the
     * amount of currency specified to the poster. Transfers ownership of the
     * item to the filler.
     * @param _trade The id of an existing trade
     */
  /*  function executeTrade1155(uint256 _trade)
        public
        virtual
    {
        Trade1155 memory trade = trades1155[_trade];
        require(trade.status == "Open", "Trade is not Open.");
        currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
        //approve the buyer to buy this token.
        item1155Token.setApprovalForAll(msg.sender, true);
        item1155Token.safeTransferFrom(address(this), msg.sender, trade.item, trade.amount, "0x00");
        trades1155[_trade].status = "Executed";
        emit TradeStatusChange(_trade, "Executed");
    }
*/
    /*
     * @dev Cancels a trade by the poster.
     * @param _trade The trade to be cancelled.
     */
  /*  function cancelTrade1155(uint256 _trade)
        public
        virtual
    {
        Trade1155 memory trade = trades1155[_trade];
        require(
            msg.sender == trade.poster,
            "Trade can be cancelled only by poster."
        );
        require(trade.status == "Open", "Trade is not Open.");
        item1155Token.safeTransferFrom(address(this), trade.poster, trade.item, trade.amount, "0x00");
        trades1155[_trade].status = "Cancelled";
        emit TradeStatusChange(_trade, "Cancelled");
    }
    */


    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
        ) override external returns (bytes4) {
          return (this.onERC1155Received.selector);  
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) override external returns (bytes4) {
        this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC1155).interfaceId;
    }
    
}