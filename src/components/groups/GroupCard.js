import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Default from '../../assets/walter-avi.png'

const GroupCard = props => {
  return (
    <GroupInfoCard minWidth={props.minWidth}>
      <Link to={`/group/${props.group.id}`}>
        <CardContainer>
          <TopDiv>
            <CardImage src={props.group.image || Default} alt='GroupAvatar' />
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
  margin: 10px;
  width: 40%;
  max-width: 250px;
  min-width: 175px;
  background-color: white;
  box-shadow: 0 0 10px rgba(33, 33, 33, 0.4);
  transition: 0.3s;
  border-radius: 2%;
  &:hover {
    box-shadow: 0 0 15px rgba(33, 33, 33, 0.6);
  }
`

const CardContainer = styled.div`
  height: 100%;
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2% 2% 0 0;
`

const TopDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 17vh;
  border-bottom: 2px solid black;
  width: 100%;
`
const MiddleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 7vh;
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
