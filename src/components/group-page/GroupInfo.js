import React from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import InviteModal from './InviteModal'
import MembershipStatus from './MembershipStatus'
import AllegiancePopover from './AllegiancePopover'
import MemberList from './MemberList'
import Default from '../../assets/walter-avi.png'
import useGetToken from 'components/utils/useGetToken'
import { addToGroup, removeRequest, removeMember } from 'actions'

const GroupInfo = props => {
  // define privacy variable for reusable formatting
  const privacy = props.group.privacy_setting
  const group_id = props.group.id
  const memberType = props.group.memberType
  const user = useSelector(state => state.userReducer.loggedInUser)
  const socket = useSelector(state => state.socketReducer.socket)
  const dispatch = useDispatch()
  const token = useGetToken()

  async function addToGroupHandler(evt, user_id) {
    evt.preventDefault()
    if (token) {
      try {
        dispatch(addToGroup({ group_id, invoker: user, user_id, socket }))
        dispatch(removeRequest({ group_id, user_id }))
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function removeMemberHandler(evt, user_id) {
    evt.preventDefault()
    dispatch(removeMember({ group_id, user_id }))
  }

  async function declineRequest(evt, user_id) {
    evt.preventDefault()
    dispatch(removeRequest({ group_id, user_id }))
  }

  return (
    <GroupInfoDiv>
      <ImageDiv>
        <GroupLogo src={props.group.image || Default} />
        <MembershipStatus
          user={user}
          group_id={props.group.id}
          members={props.members}
          privacy={privacy}
          memberType={memberType}
          // setMemberType={setMemberType}
          setTrigger={props.setTrigger}
        />
      </ImageDiv>
      <InfoDiv>
        <HeaderWrapper>
          <Header>{props.group.group_name}</Header>
          <Settings>
            {memberType === 'admin' ? (
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
        </HeaderWrapper>
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
          <h3>
            <AllegiancePopover allegiances={props.allegiances} />
          </h3>
        </SubInfo>

        <ModalWrapper>
          <MemberList
            memberType={memberType}
            requests={props.requests}
            members={props.members}
            addToGroup={addToGroupHandler}
            removeMember={removeMemberHandler}
            declineRequest={declineRequest}
          />
          {memberType && (
            <InviteModal members={props.members} group={props.group} />
          )}
        </ModalWrapper>
      </InfoDiv>
    </GroupInfoDiv>
  )
}

const GroupInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 4% 4% 4%;
  justify-content: space-around;
  align-items: center;
  width: 500px;
`
const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const SubInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Settings = styled.div`
  margin-left: 10%;
`

const ModalWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const Header = styled.h1`
  font-weight: 700;
`

export default GroupInfo
