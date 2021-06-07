import React, { Fragment, useState } from 'react';
import { Button, Message } from 'semantic-ui-react';
import { WalletProps } from '../../../data/wallet-props';
import eventContract from '../../../event-contract';
import { signer } from '../../../web3';

const BuyTicket: React.FC<BuyTicketProps> = ({
  ticketPrice = '0',
  contractAddress = '',
  isWalletConnected = false,
  onSuccess=() => {},
  onError=() => {}
}) => {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [ticketBought, setTicketBought] = useState<boolean>(false);

  const handleBuyTicket = async (): Promise<void> => {
    setInProgress(true);
    setTicketBought(false);
    try {
      const transaction = await eventContract(contractAddress)
        .connect(signer)
        .buyTicket({value: ticketPrice});
      await transaction.wait();
      setTicketBought(true);
      onSuccess();
    } catch (err) {
      onError(err.message);
    }
    setInProgress(false);
  }

  return(
    <Fragment>
      <Button
        color='green'
        onClick={handleBuyTicket}
        content='Buy Ticket'
        loading={inProgress}
        disabled={!isWalletConnected}
      />
      <Message
        content='Ticket bought'
        color='green'
        hidden={!ticketBought}  
      />
    </Fragment>
  );
}

type BuyTicketProps = WalletProps & {
  contractAddress: string;
  ticketPrice: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default BuyTicket;