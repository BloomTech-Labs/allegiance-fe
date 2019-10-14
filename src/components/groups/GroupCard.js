import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Mixpanel } from '../analytics/Mixpanel'
import styled from 'styled-components'
import { device } from 'styled/device'

const GroupCard = props => {
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const mixpanelCheck = () =>
    Mixpanel.activity(
      loggedInUser.id,
      `Visited Group Using ${props.nearby ? `Nearby Section` : `Group List`}`
    )

  return (
    <GroupInfoCard minWidth={props.minWidth}>
      <Link to={`/group/${props.group.id}`} onClick={() => mixpanelCheck()}>
        <CardContainer>
          <TopDiv>
            {props.group.image && (
              <CardImage src={props.group.image} alt='GroupAvatar' />
            )}
          </TopDiv>
          <MiddleDiv color={props.color}>
            <h4>
              <b>{props.group.group_name}</b>
            </h4>
          </MiddleDiv>
          <BottomDiv>
            <p>
              {props.group.members ? props.group.members.length : 0} members
            </p>
          </BottomDiv>
        </CardContainer>
      </Link>
    </GroupInfoCard>
  )
}

const GroupInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 28vh;
  margin: 1%;
  width: 40%;
  background-color: white;
  min-width: ${props => props.minWidth || 'none'};
  box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5%;

  &:hover {
    box-shadow: 5px 8px 16px 5px rgba(0, 0, 0, 0.2);
  }

  @media ${device.tablet} {
    width: 25%;
  }
  @media ${device.laptop} {
    width: 15%;
  }
`

const CardContainer = styled.div`
  height: 100%;
`

const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 5% 5% 0 0;
`

const TopDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 17vh;
  border-bottom: 1px solid black;
`
const MiddleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 7vh;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  color: black;
  font-weight: heavy;
  p {
    align-content: flex-end;
  }
  h4 {
    margin-top: 1%;
    width: 100%;
    overflow: hidden;
    text-overflow: scroll;
    &:hover {
      overflow: visible;
    }
  }
`
const BottomDiv = styled.div`
  display: flex;
  height: 4vh;
  color: black;
  justify-content: center;
  align-items: center;
  hr {
    color: lightgray;
    margin: 0;
  }
`

export default GroupCard
