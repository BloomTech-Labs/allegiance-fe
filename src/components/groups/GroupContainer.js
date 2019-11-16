import React from 'react'
import { useSelector } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import GroupList from './GroupList'
import NearbyGroups from './NearbyGroups'
import { withRouter } from 'react-router-dom'
function GroupContainer(props) {
  const groups = useSelector(state => state.myGroups)
  const userIn = useSelector(state => state.userReducer.loggedInUser)

  if (userIn) {
    return (
      <Container>
        <Divider />
        <H3>GROUPS NEAR YOU</H3>
        <NearbyGroups history={props.history} />
        <Divider />
        <H3>DISCOVER</H3>
        <GroupList groups={groups} />
      </Container>
    )
  } else {
    return (
      <Container>
        <H3>DISCOVER</H3>
        <GroupList groups={groups} />
      </Container>
    )
  }
}
export default withRouter(GroupContainer)

const Container = styled.div`
  h3 {
    text-align: left;
  }
  padding: 20px;
`
const H3 = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  margin: 1% 0;
`
