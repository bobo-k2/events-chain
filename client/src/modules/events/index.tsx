import { useEffect, useState } from 'react';
import { Container, Header, Button, Icon, Segment, Card } from '../common/components';
import { Link } from 'react-router-dom';
import PageLayout from '../common/components/page-layout';
import EventCard from './components/event-card';
import { WalletProps } from '../../data/wallet-props';

const Home: React.FC<WalletProps> = (props) => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getEvents();
  }, [])

  const getEvents = async (): Promise<void> => {
    const response = await fetch('/api/events')  
    const body = await response.json();
    setEvents(body);
  }

  const renderEvents = () => events.map(
    (event) => (
      <EventCard
        event={event}
        key={`event-${event.id}`}
        isWalletConnected={props.isWalletConnected}
        isConnectingWallet={props.isConnectingWallet}
      />
    ),
  );

  return (
    <PageLayout {...props}>
      <Segment inverted>
        <Container text>
          <Header
            as='h1'
            content='Create Event'
            inverted
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '1em',
            }}
          />
          <Header
            as='h2'
            content='... and let the people know what you are up to'
            inverted
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1em',
            }}
          />
          <Button as={Link} to='events/new'
            primary
            size='huge'
            style={{marginBottom: '2em'}}
            disabled={!props.isWalletConnected}
          >
            Create 
            <Icon name='arrow right' />
          </Button>
        </Container>
      </Segment>
      <Container>
        <Card.Group>
          {renderEvents()}
        </Card.Group>
      </Container>
    </PageLayout>
  )
}

export default Home;