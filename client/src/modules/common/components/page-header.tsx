import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Menu, Button } from '../../common/components';
import { WalletProps } from '../../../data/wallet-props';

const PageHeader: React.FC<WalletProps> = ({
  isWalletConnected = false,
  isConnectingWallet = false,
  onWalletConnect = () => {}
}) => {
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
          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                content='Connect Metamask'
                color='green'
                onClick={onWalletConnect}
                disabled={isWalletConnected || isConnectingWallet}
                loading={isConnectingWallet}
              />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </Segment>
  );
}

export default PageHeader;