import { ethers } from 'ethers';
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { Container, Grid, Message } from '../../../common/components';
import BuyTicket from '../../../common/components/buy-ticket';
import PageLayout from '../../../common/components/page-layout';
import Tickets, { TicketInfo } from '../tickets';
import { WalletProps } from '../../../../data/wallet-props';
import eventContract from '../../../../event-contract';
import { signer } from '../../../../web3';
import {
  errorAction,
  ActionType
} from './actions';
import { initialState, reducer } from './reducer';

declare const window: any;

const EventDetails: React.FC<WalletProps> = (props) => {
  const { address: contractAddress } = useParams<EventDetailsParams>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async (): Promise<void> => {
    try{
      dispatch({ type: ActionType.EventLoading });
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const tickets = await eventContract(contractAddress).getTicketsForUser(accounts[0]);
      const ticketPrice = await eventContract(contractAddress).ticketPrice();
      dispatch({ type: ActionType.EventLoaded, tickets, ticketPrice });
    } catch (err) {
      dispatch({type: ActionType.Error, errorMessage: err.message });
    }
  }

  const transferTicket = async (ticket: TicketInfo): Promise<void> => {
    try{
      dispatch({ type: ActionType.TicketTransfering })
      const transaction = await eventContract(contractAddress)
        .connect(signer)
        .transferTicket(ticket.id, ticket.transferTo);
      await transaction.wait();
      dispatch({ type: ActionType.TicketTransfered });

      await getEvent();
    } catch (err) {
      dispatch(errorAction(err.message));
    }
  }

  return(
    <PageLayout {...props}>
      <Container style={{marginTop: 40}}>
        <Message
          error
          header="Oops!"
          content={state.errorMessage}
          hidden={state.errorMessage === ''}
          style={{wordWrap: 'break-word'}}
        />
        <Grid columns={2} divided>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column width={4}>Event Adress</Grid.Column>
            <Grid.Column><b>{contractAddress}</b></Grid.Column>
          </Grid.Row>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column width={4}>Ticket Price</Grid.Column>
            <Grid.Column><b>{ethers.utils.formatEther(state.ticketPrice)}</b> ETH</Grid.Column>
          </Grid.Row>

          <Grid.Row verticalAlign='top'>
            <Grid.Column width={4}>Tickets bought</Grid.Column>
            <Grid.Column>
              <Tickets
                {...props}
                tickets={state.tickets}
                isTransfering={state.isLoading} 
                onTransferTicket={(ticket) => transferTicket(ticket)}
              />
              <BuyTicket
                {...props}
                contractAddress = {contractAddress}
                ticketPrice = {state.ticketPrice.toString()}
                onSuccess={async () => await getEvent()}
                onError={(error) => dispatch(errorAction(error))}
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