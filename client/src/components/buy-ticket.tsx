import React from 'react';
import { Button } from 'semantic-ui-react';
import { WalletProps } from '../data/wallet-props';
import eventContract from '../event-contract';
import { signer } from '../web3';

const BuyTicket: React.FC<BuyTicketProps> = (props) => {
  const handleBuyTicket = async (): Promise<void> => {
    try {
      const transaction = await eventContract(props.contractAddress)
        .connect(signer)
        .buyTicket({value: props.ticketPrice});
      await transaction.wait();
      props.onSuccess();
    } catch (err) {
      props.onError(err.message);
    }
  }

  return(
    <Button
      color='green'
      onClick={handleBuyTicket}
      content='Buy Ticket'
      loading={props.isConnectingWallet}
      disabled={!props.isWalletConnected}
    />
  );
}

type BuyTicketProps = WalletProps & {
  contractAddress: string;
  ticketPrice: number;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default BuyTicket;