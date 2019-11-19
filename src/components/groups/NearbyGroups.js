import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import styled from 'styled-components'
import GroupCards from './GroupCards'
import NoGroupsNearby from './NoGroupsNearby'

const NearbyGroups = props => {
  const [data, setData] = useState()

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  // Fetches user information and user groups from Redux
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const loggedInGroups = useSelector(state => state.myGroups)

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const groups = await axiosWithAuth([token]).post(`/groups/search`, {
            column: 'location',
            row: loggedInUser.location,
          })

          // Get array of ids for groups the user already is a member of
          const loggedInIDs = loggedInGroups.map(group => group.id)

          const uniqueGroups = groups.data.groupByFilter.filter(
            group => !loggedInIDs.includes(group.id)
          )

          // filtering group list to remove hidden groups from public display
          const accessGroups = uniqueGroups.filter(
            group => group.privacy_setting !== 'hidden'
          )
          // sorting groups by number of members
          accessGroups.sort((a, b) => b.members.length - a.members.length)

          setData({ groups: accessGroups })
        } catch {
          setData({ groups: [] })
        }
      }
    }

    fetchData()
  }, [token, loggedInUser, loggedInGroups])

  if (!data) {
    return (
      <LoaderDiv>
        <Loader active size='large'>
          Loading
        </Loader>
      </LoaderDiv>
    )
  }

  if (data.groups.length) {
    return (
      <NearbyGroupsContainer>
        <GroupCards groups={data.groups} />
      </NearbyGroupsContainer>
    )
  }
  if (data.groups.length === 0) {
    return (
      <NearbyGroupsContainer>
        <NoGroupsNearby {...props} loggedInUser={loggedInUser} />
      </NearbyGroupsContainer>
    )
  }
}

const NearbyGroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0px 8px 8px 8px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const LoaderDiv = styled.div`
  height: 28vh;
  margin: 4.75%;
`
export default NearbyGroups
