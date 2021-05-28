import React from 'react';
import { Segment, Container, Menu, Button } from 'semantic-ui-react';

const PageHeader: React.FC = () => {
  const fixed = false;

  return(
    <Segment
      inverted
      textAlign='center'
      style={{ minHeight: 500, padding: '1em 0em' }}
      vertical
    >
      <Menu
        fixed='top'
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size='large'
      >
        <Container>
        <Menu.Item
            header
            as="h3"
            style={{
              textAlign: 'left',
              paddingLeft: 0,
            }}
          >
            TicketsBlock
          </Menu.Item>
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          {/* <Menu.Item position='right'>
            <Button as='a' inverted={!fixed}>
              Log in
            </Button>
            <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
              Sign Up
            </Button>
          </Menu.Item> */}
        </Container>
      </Menu>
    </Segment>
  );
}

export default PageHeader;