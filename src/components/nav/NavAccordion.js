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

// export default class NavAccordion extends Component {
//   state = { activeIndex: 1 }

//   handleClick = (e, titleProps) => {
//     const { index } = titleProps
//     const { activeIndex } = this.state
//     const newIndex = activeIndex === index ? -1 : index

//     this.setState({ activeIndex: newIndex })
//   }

//   render() {
//     const { activeIndex } = this.state

//     return (
//       <Accordion>
//         <Accordion.Title
//           active={activeIndex === 0}
//           index={0}
//           onClick={this.handleClick}
//         >
//           <Icon name='dropdown' />
//           My Groups
//         </Accordion.Title>
//         <Accordion.Content active={activeIndex === 0}>
//           <GroupsNav />
//         </Accordion.Content>
//       </Accordion>
//     )
//   }
// }

export default NavAccordion
