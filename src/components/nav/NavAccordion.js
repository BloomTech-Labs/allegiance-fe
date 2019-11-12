import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import GroupsNav from './GroupsNav'

const NavAccordion = () => {
  const [activeIndex, setActiveIndex] = useState({ activeIndex: 1 })
  const handleClick = (e, titleProps) => {
    const { index } = titleProps

    const newIndex = activeIndex.activeIndex === index ? -1 : index
    setActiveIndex({ activeIndex: newIndex })
  }

  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex.activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name='dropdown' />
        My Groups
      </Accordion.Title>
      <Accordion.Content active={activeIndex.activeIndex === 0}>
        <GroupsNav />
      </Accordion.Content>
    </Accordion>
  )
}

export default NavAccordion
