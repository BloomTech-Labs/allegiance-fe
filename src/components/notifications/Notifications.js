import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'
import moment from 'moment'

// import { UPDATE_USER } from '../../reducers/userReducer'
import * as types from 'actions/actionTypes'

import NotificationsCard from './NotificationsCard'
import { fetchNotifications } from 'actions/index'

const Notifications = () => {
  const notifications = useSelector(state => state.notifyReducer.notifications)
  // Keep track of when notifications component mounts so that timestamp
  // can be passed to the put in the cleanup useEffect
  const [mountTime, setMountTime] = useState()
  const userGroups = useSelector(state => state.userReducer.loggedInGroups)
  const userId = useSelector(state => state.userReducer.loggedInUser.id)

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch notifications related data
    const mappedGroupIds = userGroups.map(group => {
      return group.id
    })
    const fetchData = async () => {
      if (token && userId) {
        try {
          const data = {
            userId,
          }
          if (!notifications.length) {
            const response = await dispatch(fetchNotifications(token, data))
          }
          setMountTime(moment().toISOString())
        } catch (error) {
          console.log(error)
        }
      }
      await dispatch({
        type: types.SET_UNREAD_NOTIFICATION_NUM,
        payload: 0,
      })
    }
    fetchData()
  }, [dispatch, token, userGroups, userId])

  // Retrieve email and location as those are required by JOI check on backend
  const { email, location } = useSelector(
    state => state.userReducer.loggedInUser
  )
  // Cleanup useEffect to change notification check time, we do this on component un-mount
  // instead of mount so that different styling can be applied to new vs old notifications
  useEffect(() => {
    return async () => {
      if (token && userId && mountTime) {
        try {
          const response = await axiosWithAuth([token]).put(
            `/users/${userId}`,
            {
              email,
              location,
              // Set timestamp to when component mounted in case activity occurred while
              // user was in the notifications tab, so that those activities aren't missed
              notification_check: mountTime,
            }
          )
          dispatch({
            type: types.UPDATE_USER_SUCCESS,
            payload: response.data.updated,
          })
          dispatch({
            type: types.SET_UNREAD_NOTIFICATION_NUM,
            payload: 0,
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }, [dispatch, email, location, userId, token, mountTime])

  if (!notifications || notifications.length === 0) {
    return <h1>No notifications</h1>
  }

  // // Filter out activity performed by the user, future versions should combine likes on same post/reply
  // const filteredNotifications = notifications.filter(
  //   act => userId !== act.user_id && userId !== act.liker_id
  // )

  return (
    <Container>
      {notifications
        .sort((e1, e2) => {
          if (e1.created_at > e2.created_at) {
            return 1
          } else if (e1.created_at < e2.created_at) {
            return -1
          } else {
            return 0
          }
        })
        .map(activity => (
          <NotificationsCard activity={activity} key={activity.id} />
        ))}
    </Container>
  )
}

const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column-reverse;
`

export default Notifications
