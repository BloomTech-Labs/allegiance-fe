import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'
import moment from 'moment'

// import { UPDATE_USER } from '../../reducers/userReducer'
import * as types from 'actions/actionTypes'

import ActivityNotificationsCard from './ActivityNotificationsCard'
import InviteNotificationCard from './InviteNotificationCard'
import { fetchNotifications, fetchInvites } from 'actions/index'

const Notifications = () => {
  const notifications = useSelector(state => state.notifyReducer.notifications)
  const invites = useSelector(state => state.notifyReducer.invites)
  // Keep track of when notifications component mounts so that timestamp
  // can be passed to the put in the cleanup useEffect
  const [mountTime, setMountTime] = useState()
  const user = useSelector(state => state.userReducer.loggedInUser)
  const userId = user.id
  // Fetches Auth0 token for axios call
  const [token] = useGetToken()
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch notifications related data
    console.log('fetching notifications')
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
  }, [dispatch, token, userId])

  // Retrieve email and location as those are required by JOI check on backend
  const { email, location } = useSelector(
    state => state.userReducer.loggedInUser
  )
  // Cleanup useEffect to change notification check time, we do this on component un-mount
  // instead of mount so that different styling can be applied to new vs old notifications
  useEffect(() => {
    return async () => {
      if (userId && mountTime) {
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
  }, [dispatch, email, location, userId, mountTime])

  if (
    (!notifications && !invites) ||
    (notifications.length === 0 && invites.length === 0)
  ) {
    return <h1>No Notifications</h1>
  }

  // // Filter out activity performed by the user, future versions should combine likes on same post/reply
  // const filteredNotifications = notifications.filter(
  //   act => userId !== act.user_id && userId !== act.liker_id
  // )

  const activityNotifications = notifications.sort((e1, e2) => {
    if (e1.created_at < e2.created_at) {
      return 1
    } else if (e1.created_at > e2.created_at) {
      return -1
    } else {
      return 0
    }
  })
  const inviteNotifications = invites.sort((e1, e2) => {
    if (e1.created_at < e2.created_at) {
      return 1
    } else if (e1.created_at > e2.created_at) {
      return -1
    } else {
      return 0
    }
  })

  return (
    <Container>
      <h1>Pending Invites</h1>
      <br />
      {inviteNotifications.map(invite => (
        <InviteNotificationCard
          invite={invite}
          user={user}
          key={`${invite.user_id}${invite.group_id}${invite.sender_id}`}
        />
      ))}
      <h1>Activity</h1>
      <br />
      {activityNotifications.map(activity => (
        <ActivityNotificationsCard activity={activity} key={activity.id} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
`

export default Notifications
