//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

/// @author Bobo K.
/// @title An event contract
contract Event {
  address public manager;
  string public eventName;
  string public venue;
  uint public ticketPrice;
  uint16 public ticketsAvailable;
  uint16 public ticketsSold;
  mapping(uint16 => address) public tickets;

  event TicketBought(address sender, address buyer);
  event TicketTransfered(uint16 ticketId, address from, address to);

  constructor(
    string memory _eventName,
    string memory _venue,
    uint _ticketPrice,
    uint16 _ticketsAvailable
  ) {
    manager = msg.sender;
    eventName = _eventName;
    venue = _venue;
    setTicketPrice(_ticketPrice);
    ticketsAvailable = _ticketsAvailable;
  }

  modifier managerOnly() {
    require(msg.sender == manager);
    _;
  }

  /// Sets the event ticket price.
  /// @param _newPrice The new ticket price
  function setTicketPrice(uint _newPrice) public managerOnly {
    ticketPrice = _newPrice;
  }

  /// Enables user to buy an ticket.
  /// @dev adds ticket id and buyer address to tickets mappings
  /// @return ticket id 
  function buyTicket() external payable returns(uint16) {
    require(msg.value >= ticketPrice, "Funds sent are lower than ticket price");
    require(ticketsSold < ticketsAvailable, "No tickets available");

    ticketsSold += 1; //TODO use SafeMath
    tickets[ticketsSold] = msg.sender;
    emit TicketBought(address(this), msg.sender);

    return ticketsSold;   
  }

  /// Transfers ticket to another user.
  /// @param _ticketId ticket id
  /// @param _to ticket receiver address
  function transferTicket(uint16 _ticketId, address _to) external {
    require(hasTicket(_ticketId), "Ticket not owned by the sender");
    require(_to != address(0), "Transfer to the zero address not allowed");

    tickets[_ticketId] = _to;
    emit TicketTransfered(_ticketId, msg.sender, _to);
  }

  /// Withdraw funds from the contract account to the owner account.
  function withdrawFunds() external payable managerOnly() {
    msg.sender.transfer(address(this).balance);
  }

  /// Checks if sender owns the ticket.
  /// @param _ticketId id to check
  /// @return a value indicating whether sender owns the ticket
  function hasTicket(uint16 _ticketId) public view returns(bool) {
    return tickets[_ticketId] == msg.sender;
  }
}
