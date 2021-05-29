import { Route, Switch } from 'react-router';
import Home from './pages/home';
import NewEvent from './pages/new-event';

function App() {
  return (
    <Switch>
      <Route path="/events/new">
        <NewEvent />
      </Route>      
      <Route path="/">
        <Home />
      </Route>      
    </Switch>
  );
}

export default App;
