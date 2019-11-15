import React from 'react'
import GroupCard from './GroupCard'

const GroupCards = ({ groups }) => {
  return (
    <div style={{ display: 'flex' }}>
      {groups.map(group => {
        return <GroupCard group={group} key={group.id} nearby={true} />
      })}
    </div>
  )
}

export default GroupCards
