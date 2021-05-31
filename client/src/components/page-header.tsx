import React from 'react';
import { Link } from 'react-router-dom';
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
            <Menu.Item as={Link} to='/'>
              Events
            </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
}

export default PageHeader;