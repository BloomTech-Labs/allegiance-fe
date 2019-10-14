import React from 'react'
import { useSelector } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import styled from 'styled-components'

import GroupList from './GroupList'
import SearchBar from './SearchBar'
import MyAllegianceGroups from '../profile/MyAllegianceGroups'
import NearbyGroups from './NearbyGroups'

function GroupContainer() {
  const loggedInGroups = useSelector(state => state.userReducer.loggedInGroups)

  return (
    <Container>
      <SearchBar />
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
}
export default GroupContainer

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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h3 {
    margin: 0 1%;
  }
`

const H3 = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 1% 0;
`
