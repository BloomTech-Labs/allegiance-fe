import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import { useAuth0 } from '../auth/react-auth0-wrapper'
import GroupList from './GroupList'
import SearchBar from './SearchBar'
import MyAllegianceGroups from '../profile/MyAllegianceGroups'
import NearbyGroups from './NearbyGroups'
import { withRouter } from 'react-router-dom'
function GroupContainer(props) {
  const loggedInGroups = useSelector(state => state.userReducer.loggedInGroups)
  const userIn = useSelector(state => state.userReducer.loggedInUser)

  if (userIn) {
    return (
      <Container>
        <SearchBar {...props} />
        <Divider />
        <MyGroups>
          <GroupTitleHolder>
            <H3>MY GROUPS</H3>
          </GroupTitleHolder>
          <>
            <MyAllegianceGroups content={loggedInGroups} type={'group'} />
          </>
        </MyGroups>
        <Divider />
        <H3>GROUPS NEAR YOU</H3>
        <NearbyGroups />
        <Divider />
        <H3>DISCOVER</H3>
        <GroupList />
      </Container>
    )
  } else {
    return (
      <Container>
        <SearchBar {...props} />
        <H3>DISCOVER</H3>
        <GroupList />
      </Container>
    )
  }
}
export default withRouter(GroupContainer)

const Container = styled.div`
  h3 {
    text-align: left;
    margin-left: 5%;
  }
`
const MyGroups = styled.div`
  margin: 2% 5%;
`

const GroupTitleHolder = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h3 {
    margin: 0 1%;
  }
`

const H3 = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  margin: 1% 0;
`
