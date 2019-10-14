import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Loader } from 'semantic-ui-react'

import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import styled from 'styled-components'

import GroupCard from './GroupCard'

const NearbyGroups = () => {
  const [data, setData] = useState()

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  // Fetches user information and user groups from Redux
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const loggedInGroups = useSelector(state => state.userReducer.loggedInGroups)

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const groups = await axiosWithAuth([token]).post(`/groups/search`, {
            column: 'location',
            row: loggedInUser.location,
          })
          console.log('NearbyGroups data', groups.data)

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

  return (
    <SectionContainer>
      <NearbyGroupsContainer>
        {data.groups.length > 0 &&
          data.groups.map(group => {
            return (
              <GroupCard
                minWidth='40%'
                group={group}
                key={group.id}
                nearby={true}
              />
            )
          })}
        {data.groups.length === 0 && (
          <h4 style={{ margin: '3% auto' }}>
            {loggedInUser.location && `No Groups Found Near Your Location`}
            {!loggedInUser.location && 'Please Provide A Location In Profile!'}
          </h4>
        )}
      </NearbyGroupsContainer>
    </SectionContainer>
  )
}

// LoaderDiv to keep sections from moving during load
const LoaderDiv = styled.div`
  height: 28vh;
  margin: 4.75%;
`

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const NearbyGroupsContainer = styled.div`
  width: 98%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-left: 1%;
  padding-bottom: 3%
  &::-webkit-scrollbar {
    display: none;
  }
`

export default NearbyGroups
