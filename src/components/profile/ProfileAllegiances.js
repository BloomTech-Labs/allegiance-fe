import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { Popup, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// change Default to change group picture default.
import Default from '../../assets/walter-avi.png'

const ProfileAllegiances = props => {
  const name = useSelector(state => state.userReducer.loggedInUser.first_name)
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
                  circular
                  inverted
                  color='grey'
                  style={{ fontSize: '2.86rem' }}
                  default={Default}
                />
              }
            />
          </Link>
        </div>
      )}
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
            <Nickname>{item.acronym && item.acronym}</Nickname>
          </div>
        ))}

      {props.content.length === 0 && (
        <Join>
          <h4>{`${name} doesn't belong to any allegiance's yet.`}</h4>
        </Join>
      )}
    </LogoHolder>
  )
}

const LogoHolder = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-left: 1%;
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

const Nickname = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 10%;
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

export default withRouter(ProfileAllegiances)
