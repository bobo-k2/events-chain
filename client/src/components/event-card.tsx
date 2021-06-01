import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';
import { IEventDbInfo } from '../data/event-info';

const EventCard: React.FC<Props> = ({ event, onBuyTicket, isWalletConnected }) => {
  const eventDate = new Date(event.date);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBuyTicket = async (): Promise<void> => {
    try {
      setLoading(true)
      await onBuyTicket(event);
    } finally {
      setLoading(false);
    }
  }

  return(
    <Card>
      <Card.Content>
        <Card.Header>{event.name}</Card.Header>
        <Card.Meta>{event.venue}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        {eventDate.toDateString()} <br/>
        {event.ticketPrice} wei <br/>
      </Card.Content>
      <Card.Content extra textAlign="right">
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
          disabled={!isWalletConnected}
        />
      </Card.Content>
    </Card>
  )
}

type Props = {
  event: IEventDbInfo;
  onBuyTicket: (event: IEventDbInfo) => void;
  isWalletConnected: boolean;
}

export default EventCard;