//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

/// @author Bobo K.
/// @title An event contract
contract Event {
  address public manager;
  uint public ticketPrice;
  uint16 public ticketsAvailable;
  uint16 public ticketsSold;
  mapping(uint16 => address) public tickets;
  mapping(address => uint16) public userTicketsCount;

  event TicketBought(address sender, address buyer);
  event TicketTransfered(uint16 ticketId, address from, address to);

  constructor(
    uint _ticketPrice,
    uint16 _ticketsAvailable,
    address _manager
  ) {
    manager = _manager;
    ticketPrice = _ticketPrice ;
    ticketsAvailable = _ticketsAvailable;
  }

  modifier managerOnly() {
    require(msg.sender == manager);
    _;
  }

  /// Sets the event ticket price.
  /// @param _newPrice The new ticket price
  function setTicketPrice(uint _newPrice) external managerOnly {
    ticketPrice = _newPrice;
  }

  /// Enables user to buy an ticket.
  /// @dev adds ticket id and buyer address to tickets mappings
  /// @return ticket id 
  function buyTicket() external payable returns(uint16) {
    require(msg.value >= ticketPrice, "Funds sent are lower than ticket price");
    require(ticketsSold < ticketsAvailable, "No tickets available");
    
    tickets[ticketsSold] = msg.sender;
    userTicketsCount[msg.sender] = userTicketsCount[msg.sender] + 1; 
    ticketsSold += 1; //TODO use SafeMath
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
    payable(msg.sender).transfer(address(this).balance);
  }

  function getTicketsForUser(address _user) external view returns(uint16[] memory) {
    uint16[] memory result = new uint16[](userTicketsCount[_user]);
    uint counter = 0;

    for (uint16 i = 0; i < ticketsSold; i++) {
      if (tickets[i] == _user) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  /// Checks if sender owns the ticket.
  /// @param _ticketId id to check
  /// @return a value indicating whether sender owns the ticket
  function hasTicket(uint16 _ticketId) public view returns(bool) {
    return tickets[_ticketId] == msg.sender;
  }
}
