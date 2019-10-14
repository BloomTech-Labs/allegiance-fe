import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Loader } from 'semantic-ui-react'

import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import styled from 'styled-components'

import GroupCard from './GroupCard'

const GroupList = () => {
  const [data, setData] = useState({ groups: [] })

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  // Fetches user groups from Redux
  const loggedInGroups = useSelector(state => state.userReducer.loggedInGroups)

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const groups = await axiosWithAuth([token]).post(`/groups/search`, {
          column: 'group_name',
          row: '',
        })
        console.log(groups.data)

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
      }
    }

    fetchData()
  }, [token, loggedInGroups])

  if (!data) {
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )
  }
  //Component should only show top 20 , load more button below. Should be sortable by recent activity/group size/allegiances

  return (
    <SectionContainer>
      <GroupListContainer>
        {data.groups.map(group => {
          return <GroupCard group={group} key={group.id} />
        })}
      </GroupListContainer>
    </SectionContainer>
  )
}

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const GroupListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: 1vh;
`

export default GroupList
