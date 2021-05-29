import { Container, Header, Button, Icon, Segment, SemanticICONS } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/page-layout';

const Home: React.FC = () => {
  const buttonIcon: SemanticICONS = 'arrow right';

  return (
    <PageLayout>
      <Segment inverted>
        <Container text>
          <Header
            as='h1'
            content='Create Event'
            inverted
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '1em',
            }}
          />
          <Header
            as='h2'
            content='... and let the people know what you are up to'
            inverted
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1em',
            }}
          />
          <Link to='events/new'>
            <Button
              primary
              size='huge'
              style={{marginBottom: '2em'}}
            >
              Create 
              <Icon name={buttonIcon} />
            </Button>
          </Link>
        </Container>
      </Segment>
    </PageLayout>
  )
}

export default Home;