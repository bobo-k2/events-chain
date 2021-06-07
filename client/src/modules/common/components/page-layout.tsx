import React, { Fragment } from 'react';
import { WalletProps } from '../../../data/wallet-props';
import PageHeader from './page-header';

const PageLayout: React.FC<WalletProps> = (props) => {
  return(
    <Fragment>
      <PageHeader
        isWalletConnected={props.isWalletConnected}
        onWalletConnect={props.onWalletConnect}
        isConnectingWallet={props.isConnectingWallet}
      />
      {props.children}
    </Fragment>
  )
}

export default PageLayout;