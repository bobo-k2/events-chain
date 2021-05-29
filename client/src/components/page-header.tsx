import React from 'react';
import { Segment, Container, Menu } from 'semantic-ui-react';

const PageHeader: React.FC = () => {
  return(
    <Segment
      inverted
      textAlign='center'
      style={{ padding: '1em 0em' }}
      vertical
    >
      <Menu
        fixed='top'
        inverted
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
          <Menu.Item as='a'>
            Event
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