//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import './Event.sol';

/// @author Bobo K.
/// @title Deploys event contracts
contract EventFactory {
  address[] public events;
  uint16 eventsCount;

  function createEvent(
    string memory _name,
    string memory _venue,
    uint _date,
    uint _ticketPrice,
    uint16 _ticketsAvailable
  ) external {
    Event newEvent = new Event(
      _name,
      _venue,
      _date,
      _ticketPrice,
      _ticketsAvailable
    );

    events.push(address(newEvent));
  }

  function getEvents() external view returns(address[] memory) {
        return events;
    }
}