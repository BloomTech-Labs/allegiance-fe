import React, { Fragment } from 'react';
import { Header, Icon, Button, List, Modal, Image, Label, Menu, Tab } from 'semantic-ui-react';
import styled from 'styled-components';

const MemberList = props => {
  const { memberType, members, requests, addToGroup, declineRequest, removeMember } = props;
  const groupSize = members.length;
  const requestSize = requests.length;

  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Users' },
      render: () => <Tab.Pane>
        <StyledList divided verticalAlign='middle'>
          {
            members.map(member => (
              <Fragment key={member.id}>
                <List.Item>
                  {memberType === 'admin' &&
                    <List.Content floated='right'>
                      <Button icon color="red" onClick={(evt) => removeMember(evt, member.id)}><Icon name='remove' /></Button>
                    </List.Content>
                  }
                  <Image avatar src={member.image} />
                  <List.Content>{member.username}</List.Content>
                </List.Item>
              </Fragment>
            ))
          }
        </StyledList>
      </Tab.Pane>,
    },
  ]

  if (memberType === 'admin') {
    panes.push({
      menuItem: (
        <Menu.Item key='messages'>
          Pending Requests
          <Label>{requestSize}</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>
        <StyledList divided verticalAlign='middle'>
          {
            requests.map(member => (
              <Fragment key={member.id}>
                <List.Item>
                  <List.Content floated='right'>
                    <Button icon color="green" onClick={(evt) => addToGroup(evt, member.id)}><Icon name='checkmark' /></Button>
                    <Button icon color="red" onClick={(evt) => declineRequest(evt, member.id)}><Icon name='remove' /></Button>
                  </List.Content>
                  <Image avatar src={member.image} />
                  <List.Content>{member.username}</List.Content>
                </List.Item>
              </Fragment>
            ))
          }
        </StyledList>
      </Tab.Pane>,
    })
  }

  return (
    <Modal trigger={<Button>{groupSize} Members</Button>}>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>
          Group Members
          <br />
          {groupSize}
        </Header.Content>
      </Header>
      <Modal.Content>
        <Tab panes={panes}/>
      </Modal.Content>
    </Modal>
  )
}

const StyledList = styled(List)`
  min-height: 300px;
`;

export default MemberList;