import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Loader } from 'semantic-ui-react'

import axios from 'components/utils/axiosWithoutAuth'
import useGetToken from '../utils/useGetToken'
import styled from 'styled-components'

import GroupCard from './GroupCard'

const GroupList = props => {
  const [data, setData] = useState({ groups: [] })
  const { groups } = props

  useEffect(() => {
    const fetchData = async () => {
      const groupResult = await axios.post(`/groups/search`, {
        column: 'group_name',
        row: '',
      })
      console.log(groupResult.data)

      // Get array of ids for groups the user already is a member of
      const loggedInIDs = groups.map(group => group.id)

      const uniqueGroups = groupResult.data.groupByFilter.filter(
        group => !loggedInIDs.includes(group.id)
      )
      uniqueGroups.sort((a, b) => b.members.length - a.members.length)

      setData({ groups: uniqueGroups })
    }

    fetchData()
  }, [groups])

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
