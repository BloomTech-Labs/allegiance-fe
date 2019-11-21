import React from 'react'
import { withRouter } from 'react-router'
import { Popup, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// change Default to change group picture default.
import Default from '../../assets/walter-avi.png'

const MyGroups = props => {
  const mixpanelCheck = link => {
    if (props.type === 'group') {
      props.history.push(link)
    }
  }

  return (
    <LogoHolder>
      {props.type === 'group' && (
        <div style={{ margin: '1%' }}>
          <Link to={`/creategroup`}>
            <Popup
              content={'Create a Group'}
              trigger={
                <Icon
                  name='plus'
                  size='big'
                  color='grey'
                  style={{ fontSize: '2.86rem' }}
                  default={Default}
                />
              }
            />
          </Link>
        </div>
      )}
      {/* this only renders the account has a group(s) */}
      {!!props.content.length &&
        props.content.map(item => (
          <div
            key={item.id}
            style={{ margin: '1%' }}
            onClick={() => mixpanelCheck(`/${props.type}/${item.id}`)}
          >
            <Popup
              content={item.name}
              trigger={<GroupLogo src={item.image || Default} alt='Logo' />}
            />
          </div>
        ))}
      {/* this only renders the account doesnt have any groups */}
      {props.content.length === 0 && (
        <Join>
          <h4>{`You don't belong to any groups yet.`}</h4>
        </Join>
      )}
    </LogoHolder>
  )
}

const LogoHolder = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  background-color: transparent;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Join = styled.div`
  display: flex;
  flex-wrap: column;
  align-items: center;
  font-weight: bold;
  letter-spacing: adjusting;
  font-size: 2rem;
`

const GroupLogo = styled.img`
  border-color: black;
  object-fit: cover;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid black;
  flex: 0 0 auto;
  box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
`

export default withRouter(MyGroups)
