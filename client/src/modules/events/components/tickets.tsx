import React, { useState, useEffect } from 'react';
import { Input, List, Icon } from 'modules/common/components';
import { WalletProps } from 'data/wallet-props';

const Tickets: React.FC<Props> = ({
  tickets = [],
  isWalletConnected = false,
  isTransfering = false,
  onTransferTicket = () => {}
}) => {
  const [ticketsBought, setTicketsBought] = useState<TicketInfo[]>([]);

  const canTransfer = (index: number) => 
    ticketsBought.length > 0 && isWalletConnected && ticketsBought[index].transferTo !== '';  

  useEffect(() => {
    setTicketsBought(tickets.map((ticket: number) => {
      return {
        id: ticket,
        transferTo: '',
        inProgress: false
      }
    }));
  }, [tickets]);

  const setTransferAddress = (address: string, index: number): void => {
    setTicketsBought([
      ...ticketsBought.slice(0, index),
      { ...ticketsBought[index], transferTo: address },
      ...ticketsBought.slice(index + 1)
    ]);
  }

  const handleTransferTicket = (ticket: TicketInfo, index: number): void => {
    setTicketsBought([
      ...ticketsBought.slice(0, index),
      { ...ticketsBought[index], inProgress: true },
      ...ticketsBought.slice(index + 1)
    ]);
    onTransferTicket(ticket);
  }

  return(
    <List divided>
      {ticketsBought.length > 0
        ? ticketsBought.map((ticket: TicketInfo, index: number) =>(
          <List.Item key={`item-${ticket.id}`}>
            <List.Content floated='right'>
              <Input
                value={ticket.transferTo}
                onChange={(e) => setTransferAddress(e.target.value, index)}
                placeholder='Enter receiver address'
                action={{
                  color: 'green',
                  content: 'Transfer',
                  disabled: !canTransfer(index),
                  loading:  ticket.inProgress && isTransfering,
                  onClick: () => handleTransferTicket(ticket, index)
                }}
                style={{
                  width: 450
                }}
              />
            </List.Content>
            <Icon name='ticket' />
            <List.Content>ID <b>{ticket.id}</b></List.Content>
          </List.Item>
          ))
        : <List.Item>No tickets found</List.Item>
      }
    </List>
  )
}

type Props = WalletProps & {
  tickets: number[];
  isTransfering: boolean;
  onTransferTicket: (ticket: TicketInfo) => void;
}

export type TicketInfo = {
  id: number;
  transferTo: string;
  inProgress: boolean;
}

export default Tickets;