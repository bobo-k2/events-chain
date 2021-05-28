//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

// import "hardhat/console.sol";

contract Event {
  address public manager;
  string public eventName;
  string public venue;
  uint public ticketPrice;
  uint16 public ticketsAvailable;
  mapping(address => bool) ticketBuyers;

  event TicketBought(address sender, address buyer);

  constructor(
    string memory _eventName,
    string memory _venue,
    uint _ticketPrice,
    uint16 _ticketsAvailable
  ) {
    manager = msg.sender;
    eventName = _eventName;
    venue = _venue;
    ticketPrice = _ticketPrice;
    ticketsAvailable = _ticketsAvailable;
  }

  modifier managerOnly() {
    require(msg.sender == manager);
    _;
  }

  function  setTicketPrice(uint _newPrice) public managerOnly {
    ticketPrice = _newPrice;
  }

  function buyTicket() external payable {
    require(msg.value >= ticketPrice, "Funds sent are lower than ticket price");

    ticketBuyers[msg.sender] = true;
    emit TicketBought(address(this), msg.sender);   
  }

  function hasTicket() public view returns(bool) {
    return ticketBuyers[msg.sender];
  }
}
