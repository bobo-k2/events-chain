import React, { useState } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { IEventDbInfo } from '../data/event-info';

const EventCard: React.FC<Props> = ({ event, onBuyTicket, isWalletConnected }) => {
  const eventDate = new Date(event.date);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBuyTicket = () => {
    try {
      setLoading(true)
      onBuyTicket(event);
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