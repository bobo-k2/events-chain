import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import EventDetails from './pages/event-details';
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
        await window.ethereum.request({ method: 'eth_requestAccounts' });
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

  const getProps = {
    isConnectingWallet: connectingWallet,
    isWalletConnected: walletConnected,
    onWalletConnect: connectWallet
  }

  return (
    <Switch>
      <Route path="/events/new">
        <NewEvent {...getProps}/>
      </Route>      
      <Route path="/events/:address">
        <EventDetails {...getProps}/>
      </Route>      
      <Route path="/">
        <Home {...getProps}/>
      </Route>      
    </Switch>
  );
}

export default App;
