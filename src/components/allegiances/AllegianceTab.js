import React from 'react'
import { Tab } from 'semantic-ui-react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
// import { ADD_ALLEGIANCE, LEAVE_ALLEGIANCE } from '../../reducers/userReducer'
import * as types from 'actions/actionTypes'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'

const AllegianceTab = props => {
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const loggedInAllegiances = useSelector(
    state => state.userReducer.loggedInAllegiances
  )
  const dispatch = useDispatch()

  //Fetches Auth0 token for axios call
  const [token] = useGetToken()

  // Get array of ids for allegiances the user already is a member of
  const loggedInIDs = loggedInAllegiances.map(group => group.id)

  const addAllegiance = async allegiance => {
    try {
      const userAllegiance = await axiosWithAuth([token]).post(
        `/users_allegiances/`,
        {
          user_id: loggedInUser.id,
          allegiance_id: allegiance.id,
        }
      )
      const {
        allegiance_id,
        allegiance_name,
        allegiance_image,
      } = userAllegiance.data.newUserAllegiances
      const newAllegiance = {
        id: allegiance_id,
        name: allegiance_name,
        image: allegiance_image,
      }
      dispatch({ type: types.ADD_ALLEGIANCES_SUCCESS, payload: newAllegiance })
    } catch (err) {
      dispatch({ type: types.ADD_ALLEGIANCES_FAILURE, payload: err })
      console.log('Something went wrong.')
    }
  }

  const leaveAllegiance = async id => {
    try {
      const deleted = {
        user_id: loggedInUser.id,
        allegiance_id: id,
      }
      const deletedAllegiance = await axiosWithAuth([token]).delete(
        '/users_allegiances/',
        { data: deleted }
      )
      console.log(deletedAllegiance)
      dispatch({ type: types.LEAVE_ALLEGIANCE_SUCCESS, payload: id })
    } catch {
      dispatch({ type: types.LEAVE_ALLEGIANCE_FAILURE, payload: id })
      console.log('Something went wrong.')
    }
  }

  return (
    <Tab.Pane attached={false}>
      <LogoHolder>
        {props.allegiances.map(allegiance => (
          <div key={allegiance.id} style={{ margin: '1% 2% 2%' }}>
            {loggedInIDs.includes(allegiance.id) ? (
              <AllegianceLogo
                src={allegiance.image}
                alt={allegiance.name}
                onClick={() => leaveAllegiance(allegiance.id)}
                style={{ border: '3px solid #00FF00' }}
              />
            ) : (
              <AllegianceLogo
                src={allegiance.image}
                alt={allegiance.name}
                onClick={() => addAllegiance(allegiance)}
              />
            )}
          </div>
        ))}
      </LogoHolder>
    </Tab.Pane>
  )
}

const LogoHolder = styled.div`
  width: 98%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 1%;
  &::-webkit-scrollbar {
    display: none;
  }
`

const AllegianceLogo = styled.img`
  border-color: black;
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
  flex: 0 0 auto;
  box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
`

export default AllegianceTab
