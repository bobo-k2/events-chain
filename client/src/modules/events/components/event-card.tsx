import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Message } from 'semantic-ui-react';
import { IEventDbInfo } from '../../../data/event-info';
import BuyTicket from '../../common/components/buy-ticket';

const EventCard: React.FC<Props> = ({
  event = {
    contractAddress: '',
    date: 0,
    ticketPrice: '0',
  },
  isWalletConnected = false,
  isConnectingWallet = false }) => {
  const eventDate = new Date(event.date);
  const [errorMessage, setErrorMessage] = useState<string>('');

  return(
    <Card>
      <Card.Content>
        <Card.Header>{event.name}</Card.Header>
        <Card.Meta>{event.venue}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        {eventDate.toDateString()} <br/>
        {ethers.utils.formatEther(event.ticketPrice).toString()} ETH <br/>
      </Card.Content>
      <Card.Content extra>
        <Button
          as={Link}
          to={`/events/${event.contractAddress}`}
          content='Details'
          disabled={!isWalletConnected}
        />
        <BuyTicket
          isWalletConnected = {isWalletConnected}
          contractAddress = {event.contractAddress}
          isConnectingWallet = {isConnectingWallet}
          ticketPrice = {event.ticketPrice}
          onError = {(error) => setErrorMessage(error)}
          onSuccess = {() => {}}
          onWalletConnect = {() => {}}
        />
        <Message
          error
          header="Oops!"
          content={errorMessage}
          hidden={errorMessage === ''}
          style={{wordWrap: 'break-word'}}
        />
      </Card.Content>
    </Card>
  )
}

type Props = {
  event: IEventDbInfo;
  isWalletConnected: boolean;
  isConnectingWallet: boolean;
}

export default EventCard;