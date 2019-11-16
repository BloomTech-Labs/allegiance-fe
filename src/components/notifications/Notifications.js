import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'
import moment from 'moment'
import * as types from 'actions/actionTypes'
//import PICTURES (SVG)
import undrawCompleteTask from '../../assets/undraw/undrawCompleteTask.svg'
import ActivityNotificationsCard from './ActivityNotificationsCard'
import InviteNotificationCard from './InviteNotificationCard'
import { fetchNotifications } from 'actions/index'

const Notifications = () => {
  const notifications = useSelector(state => state.notifyReducer.notifications)
  const invites = useSelector(state => state.notifyReducer.invites)
  const [mountTime, setMountTime] = useState()
  const user = useSelector(state => state.userReducer.loggedInUser)
  const userId = user.id
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
            await dispatch(fetchNotifications(token, data))
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
  }, [dispatch, token, userId, notifications.length])

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
  }, [dispatch, email, location, userId, mountTime, token])

  if (!notifications) {
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )
  }

  if (
    (!notifications && !invites) ||
    (notifications.length === 0 && invites.length === 0)
  ) {
    return (
      <Wrapper>
        <Header>No Notifications</Header>
        <Img src={undrawCompleteTask} />
        <br />
      </Wrapper>
    )
  }

  // // Filter out activity performed by the user, future versions should combine likes on same post/reply
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
      <Header>Pending Invites</Header>
      <br />
      {inviteNotifications.map(invite => (
        <InviteNotificationCard
          invite={invite}
          user={user}
          key={`${invite.user_id}${invite.group_id}${invite.sender_id}`}
        />
      ))}
      <Header>Activity</Header>
      <br />
      {activityNotifications.map(activity => (
        <ActivityNotificationsCard activity={activity} key={activity.id} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  background-color: #e8edf1;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  display: flex
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`

const Header = styled.h1`
  text-align: center
  margin-top: 25px
  margin-bottom: 25px
  font-size: 3.5rem;
  font-weight: 700;
`

const Img = styled.img`
  width: 70vw;
  height: 70vh;
`

export default Notifications
