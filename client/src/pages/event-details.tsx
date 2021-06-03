import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Grid, Icon, Input, List, Message } from 'semantic-ui-react';
import PageLayout from '../components/page-layout';
import { WalletProps } from '../data/wallet-props';
import eventContract from '../event-contract';
import { signer } from '../web3';

declare const window: any;

const EventDetails: React.FC<WalletProps> = (props) => {
  const { address: contractAddress } = useParams<EventDetailsParams>();
  const [ticketsBought, setTicketsBought] = useState<TicketInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const canTransfer = (index: number) => 
    ticketsBought.length > 0 && props.isWalletConnected && ticketsBought[index].transferTo !== '';  

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async (): Promise<void> => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const tickets = await eventContract(contractAddress).getTicketsForUser(accounts[0]);
    
    setTicketsBought(tickets.map((ticket: number) => {
      return {
        id: ticket,
        transferTo: ''
      }
    }));
  }

  const transferTicket = async (index: number): Promise<void> => {
    const ticket: TicketInfo = ticketsBought[index];
    setErrorMessage('');
    setIsLoading(true);

    try{
      const transaction = await eventContract(contractAddress)
        .connect(signer)
        .transferTicket(ticket.id, ticket.transferTo);
      await transaction.wait();
      await getEvent();
    } catch (err) {
      setErrorMessage(err.message);
    }

    setIsLoading(false);
  }

  const setTransferAddress = (address: string, index: number): void => {
    setTicketsBought([
      ...ticketsBought.slice(0,index),
      Object.assign({}, ticketsBought[index], {transferTo: address}),
      ...ticketsBought.slice(index+1)
    ]);
  }

  const renderTickets = () => (
    <List divided verticalAlign='middle'>
      {ticketsBought.map((ticket: TicketInfo, index: number) =>(
        <List.Item key={`item-${ticket.id}`}>
          <List.Content floated='right'>
            <Input
              value={ticket.transferTo}
              onChange={(e) => setTransferAddress(e.target.value, index)}
              action={{
                color: 'green',
                content: 'Transfer',
                disabled: !canTransfer(index),
                loading: isLoading,
                onClick: () => transferTicket(index)
              }}
              style={{
                width: 450
              }}
            />
          </List.Content>
          <Icon name='ticket' />
          <List.Content>{ticket.id}</List.Content>
        </List.Item>
      ))}
    </List>
  )

  return(
    <PageLayout {...props}>
      <Container style={{marginTop: 40}}>
        <Message
          error
          header="Oops!"
          content={errorMessage}
          hidden={errorMessage === ''}
          style={{wordWrap: 'break-word'}}
        />
        <Grid columns={2} divided>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column width={4}>Event Adress</Grid.Column>
            <Grid.Column><b>{contractAddress}</b></Grid.Column>
          </Grid.Row>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column verticalAlign='top' width={4}>Tickets</Grid.Column>
            <Grid.Column>
              {ticketsBought.length > 0 && renderTickets()}
              {ticketsBought.length === 0 &&
                <span>No tickets found</span>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </PageLayout>
  );
}

type EventDetailsParams = {
  address: string;
};

type TicketInfo = {
  id: number;
  transferTo: string;
  inProgress: boolean;
}

export default EventDetails;