import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Message } from 'semantic-ui-react';
import { IEventDbInfo } from '../data/event-info';
import eventContract from '../event-contract';
import { signer } from '../web3';

const EventCard: React.FC<Props> = ({ event, isWalletConnected }) => {
  const eventDate = new Date(event.date);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleBuyTicket = async (): Promise<void> => {
    setLoading(true);
    setErrorMessage('');
    try {
      
      const transaction = await eventContract(event.contractAddress)
        .connect(signer)
        .buyTicket({value: event.ticketPrice});
      await transaction.wait();
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  }

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
        <Button
          color='green'
          onClick={handleBuyTicket}
          content='Buy Ticket'
          loading={loading}
          disabled={!isWalletConnected || loading}
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
}

export default EventCard;