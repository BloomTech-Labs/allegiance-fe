import React from 'react'
import MyAllegianceGroups from '../profile/MyAllegianceGroups'
import { useSelector } from 'react-redux'

const GroupsNav = () => {
  const loggedInGroups = useSelector(state => state.myGroups)
  return (
    <>
      <MyAllegianceGroups content={loggedInGroups || []} type='group' />
    </>
  )
}

export default GroupsNav
