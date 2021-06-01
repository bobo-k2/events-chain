import { useEffect, useState } from 'react';
import { Container, Header, Button, Icon, Segment, SemanticICONS, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/page-layout';
import EventCard from '../components/event-card';
import { IEventDbInfo } from '../data/event-info';
import eventContract from '../event-contract';
import { signer } from '../web3';
import { WalletProps } from '../data/wallet-props';

const Home: React.FC<WalletProps> = (props) => {
  const buttonIcon: SemanticICONS = 'arrow right';

  const [events, setEvents] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
        onBuyTicket={handleBuyTicket}
        key={`event-${event.id}`}
        isWalletConnected={props.isWalletConnected}
      />
    ),
  );

  const handleBuyTicket = async (event: IEventDbInfo) => {
    try {
      const transaction = await eventContract(event.contractAddress)
        .connect(signer)
        .buyTicket({value: event.ticketPrice});
      const ticketId: number = await transaction.wait();
      console.log(ticketId);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

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
            <Icon name={buttonIcon} />
          </Button>
        </Container>
      </Segment>
      <Container>
        <Card.Group centered>
          {renderEvents()}
        </Card.Group>
      </Container>
    </PageLayout>
  )
}

export default Home;