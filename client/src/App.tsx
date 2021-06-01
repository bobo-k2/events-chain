import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import Home from './pages/home';
import NewEvent from './pages/new-event';

declare const window: any;

const App: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [connectingWallet, setConnectingWallet] = useState<boolean>(false);

  const connectWallet = async(): Promise<void> => {
    if(typeof window.ethereum !== 'undefined') {
      setConnectingWallet(true);
      try{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts);
        setWalletConnected(true);
      } catch {
        console.log('User canceled Metamask connection');
      }
      setConnectingWallet(false);
    } else {
      // TOOD check for Metamask in web3.ts
      alert('Please install Metamask to use this application!')
    }
  }

  return (
    <Switch>
      <Route path="/events/new">
        <NewEvent
          isConnectingWallet={connectingWallet}
          isWalletConnected={walletConnected}
          onWalletConnect={connectWallet}
        />
      </Route>      
      <Route path="/">
        <Home
          isConnectingWallet={connectingWallet}
          isWalletConnected={walletConnected}
          onWalletConnect={connectWallet}
        />
      </Route>      
    </Switch>
  );
}

export default App;
