import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Grid, Message } from '../../common/components';
import BuyTicket from '../../common/components/buy-ticket';
import PageLayout from '../../common/components/page-layout';
import Tickets, { TicketInfo } from './tickets';
import { WalletProps } from '../../../data/wallet-props';
import eventContract from '../../../event-contract';
import { signer } from '../../../web3';

declare const window: any;

const EventDetails: React.FC<WalletProps> = (props) => {
  const { address: contractAddress } = useParams<EventDetailsParams>();
  const [tickets, setTickets] = useState<number[]>([]);
  const [ticketPrice, setTicketprice] = useState<BigNumber>(BigNumber.from('0'));
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async (): Promise<void> => {
    setErrorMessage('');
    try{
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setTickets(await eventContract(contractAddress).getTicketsForUser(accounts[0]));
      setTicketprice(await eventContract(contractAddress).ticketPrice());
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  const transferTicket = async (ticket: TicketInfo): Promise<void> => {
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
            <Grid.Column width={4}>Ticket Price</Grid.Column>
            <Grid.Column><b>{ethers.utils.formatEther(ticketPrice)}</b> ETH</Grid.Column>
          </Grid.Row>

          <Grid.Row verticalAlign='top'>
            <Grid.Column width={4}>Tickets bought</Grid.Column>
            <Grid.Column>
              <Tickets
                {...props}
                tickets={tickets}
                isTransfering={isLoading} 
                onTransferTicket={(ticket) => transferTicket(ticket)}
              />
              <BuyTicket
                {...props}
                contractAddress = {contractAddress}
                ticketPrice = {ticketPrice.toString()}
                onSuccess={async () => await getEvent()}
                onError={(error) => setErrorMessage(error)}
              />
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

export default EventDetails;