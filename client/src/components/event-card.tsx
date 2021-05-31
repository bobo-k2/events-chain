import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import { IEventDbInfo } from '../data/event-info';

const EventCard: React.FC<Props> = ({ event }) => {
  const eventDate = new Date(event.date);

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
        <Button color='green'>Buy Ticket</Button>
      </Card.Content>
    </Card>
  )
}

type Props = {
  event: IEventDbInfo;
}

export default EventCard;