import PageHeader from './components/page-header';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <PageHeader />

      <Container text>
        <Header
          as='h1'
          content='Create Event'
          inverted
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em',
          }}
        />
        <Header
          as='h2'
          content='... and let the people know what you are up to'
          inverted
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em',
          }}
        />
        <Button primary size='huge'>
          Get Started
          {/* <Icon name='right arrow' /> */}
        </Button>
      </Container>
    </Fragment>
  );
}

export default App;
