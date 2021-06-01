//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import './Event.sol';

/// @author Bobo K.
/// @title Deploys event contracts
contract EventFactory {
  address[] public events;
  uint16 public eventsCount;

  function createEvent(
    uint _ticketPrice,
    uint16 _ticketsAvailable
  ) external returns(address) {
    Event newEvent = new Event(
      _ticketPrice,
      _ticketsAvailable,
      msg.sender
    );
    events.push(address(newEvent));
    eventsCount ++;

    return events[eventsCount - 1];
  }

  function getEvents() external view returns(address[] memory) {
        return events;
    }
}