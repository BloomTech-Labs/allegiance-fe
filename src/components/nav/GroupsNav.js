import React from 'react'
import MyAllegianceGroups from '../profile/MyAllegianceGroups'
import { useSelector } from 'react-redux'

const GroupsNav = () => {
  const loggedInGroups = useSelector(state => state.myGroups)
  return (
    <>
      <h1>My Groups</h1>
      <MyAllegianceGroups content={loggedInGroups || []} type='group' />
    </>
  )
}

export default GroupsNav
