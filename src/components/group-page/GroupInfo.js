import React from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MembershipStatus from './MembershipStatus'
import AllegiancePopover from './AllegiancePopover'
import MembersList from './MembersList'

const GroupInfo = props => {
  // define privacy variable for reusable formatting
  const privacy = props.group.privacy_setting

  const loggedInGroups = useSelector(state => state.userReducer.loggedInGroups)
  const isAdmin = loggedInGroups
    ? loggedInGroups.find(group => group.id === props.group.id)
    : null

  return (
    <GroupInfoDiv>
      <ImageDiv>
        <GroupLogo src={props.group.image} />
        <MembershipStatus
          group_id={props.group.id}
          members={props.members}
          privacy={privacy}
          setTrigger={props.setTrigger}
        />
      </ImageDiv>
      <InfoDiv>
        <h1>{props.group.group_name}</h1>
        <h2>{props.group.description}</h2>
        <SubInfo>
          <h3>
            {props.group.privacy_setting === 'private' ? (
              <Icon name='lock' />
            ) : (
              <Icon name='unlock' />
            )}
            {privacy
              ? privacy.charAt(0).toUpperCase() + privacy.slice(1)
              : null}{' '}
            Group
          </h3>
          <MembersList
            group_id={props.group.id}
            members={props.members}
            setTrigger={props.setTrigger}
          />
        </SubInfo>
        <AllegiancePopover allegiances={props.allegiances} />
      </InfoDiv>
      <Settings>
        {isAdmin && isAdmin.user_type === 'admin' ? (
          <Link
            to={{
              pathname: `/editgroup/${props.group.id}`,
              state: { group: props.group },
            }}
          >
            <Icon name='setting' size='large' />
          </Link>
        ) : null}
      </Settings>
    </GroupInfoDiv>
  )
}

const GroupInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 4% 4% 4%;
  justify-content: space-around;
`
const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const SubInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const GroupLogo = styled.img`
  border-color: black;
  object-fit: cover;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid black;
  flex: 0 0 auto;
  box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
`

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 57%;
  margin: 0 4% 4% 4%;
  justify-content: center;
  min-height: 50%;
  h1 {
    font-size: 1.45rem;
    text-align: left;
    margin: 0 0 2% 0;
  }
  h2 {
    font-size: 1.25rem;
    color: grey;
    text-align: left;
    margin: 0 0 2% 0;
  }
  h3 {
    font-size: 1rem;
    text-align: left;
    margin: 0 0 2% 0;
  }
`

const Settings = styled.div`
  position: absolute;
  top: 8%;
  right: 2%;
`

export default GroupInfo
