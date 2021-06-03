import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { WalletProps } from '../data/wallet-props';
import eventContract from '../event-contract';
import { signer } from '../web3';

const BuyTicket: React.FC<BuyTicketProps> = (props) => {
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleBuyTicket = async (): Promise<void> => {
    setInProgress(true);
    try {
      const transaction = await eventContract(props.contractAddress)
        .connect(signer)
        .buyTicket({value: props.ticketPrice});
      await transaction.wait();
      props.onSuccess();
    } catch (err) {
      props.onError(err.message);
    }
    setInProgress(false);
  }

  return(
    <Button
      color='green'
      onClick={handleBuyTicket}
      content='Buy Ticket'
      loading={inProgress}
      disabled={!props.isWalletConnected}
    />
  );
}

type BuyTicketProps = WalletProps & {
  contractAddress: string;
  ticketPrice: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default BuyTicket;