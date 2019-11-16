import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const NoGroupsNearby = props => {
  const { loggedInUser } = props
  const goToCreateGroup = evt => {
    evt.preventDefault()
    props.history.push('/creategroup')
  }
  return (
    <h4 style={{ margin: '3% auto' }}>
      {loggedInUser.location && (
        <ResultsDiv>
          <h1>
            No groups found near your location. Start one now to engage with
            your local community!
          </h1>
          <CreateGroupButton primary onClick={goToCreateGroup}>
            Create a Group{' '}
          </CreateGroupButton>
        </ResultsDiv>
      )}
      {!loggedInUser.location && 'Please Provide A Location In Profile!'}
    </h4>
  )
}

export default NoGroupsNearby

const ResultsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`
const CreateGroupButton = styled(Button)`
  color: white !important;
  margin-top: 20px !important;
  font-size: 1.8rem !important;
  background-color: #4483cd !important;
  :hover {
    background-color: #1a4570 !important;
    curser: pointer;
  }
`
