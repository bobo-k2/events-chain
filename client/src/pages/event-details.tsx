import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Container, Grid, Message, Segment } from 'semantic-ui-react';
import PageLayout from '../components/page-layout';
import { WalletProps } from '../data/wallet-props';
import eventContract from '../event-contract';

declare const window: any;

const EventDetails: React.FC<WalletProps> = (props) => {
  const { address } = useParams<EventDetailsParams>();
  const [ticketsBought, setTicketsBought] = useState<number>(0);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async (): Promise<void> => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const userTicketsCount = await eventContract(address).userTicketsCount(accounts[0]);
    setTicketsBought(userTicketsCount);
  }

  return(
    <PageLayout {...props}>
      <Container style={{marginTop: 40}}>
        <Grid columns={3} divided>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>Adress</Grid.Column>
            <Grid.Column><b>{address}</b></Grid.Column>
          </Grid.Row>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>Tickets Bought</Grid.Column>
            <Grid.Column><b>{ticketsBought}</b></Grid.Column>
            <Grid.Column>
            <Button primary content='Buy more' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <Segment>
          <h2>Event details</h2>
          <Segment.Group horizontal>
            <Segment>Address</Segment>
            <Segment>{address}</Segment>
            <Segment />
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment>Tickets Bought</Segment>
            <Segment>{ticketsBought}</Segment>
            <Segment>
              <Button primary content='Buy more' />
            </Segment>
          </Segment.Group>
        </Segment>

        <Message>
          <Message.Header>
            Address
          </Message.Header>
          <Message.Content>
            {address}
          </Message.Content>
        </Message>
        <Message>
          <Message.Header>
            Tickets Bought
          </Message.Header>
          <Message.Content>
            {ticketsBought}
          </Message.Content>
        </Message>           */}
      </Container>
    </PageLayout>
  );
}

type EventDetailsParams = {
  address: string;
};

export default EventDetails;