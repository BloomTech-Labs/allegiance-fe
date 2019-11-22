import React, { useState, useEffect } from 'react'
import { useAuth0 } from '../auth/react-auth0-wrapper'
import { useSelector, useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Mobile, Tablet } from '../utils/responsive'

import useGetToken from '../utils/useGetToken'
import UserNav from './UserNav'
import Navigation from './Navigation'
import NavSearch from './NavSearch'
import NavBottom from './NavBottom'

import styled from 'styled-components'
import { Loader, Menu, Icon, Modal } from 'semantic-ui-react'
import {
  CreateNotification,
  createInvite,
  fetchNotifications,
  fetchInvites,
  receiveGroupPost,
  receiveLike,
  receiveDislike,
  receiveReplyLike,
  receiveReplyDislike,
  receiveGroupReply,
  receivePostReply,
} from 'actions'
import {
  SET_UNREAD_NOTIFICATION_NUM,
  INCREMENT_UNREAD_NOTIFICATION_NUM,
} from 'actions/actionTypes'
import { fetchPrivateRequests, receivingGroup } from 'actions'
import {
  receiveFeedLike,
  receiveFeedDislike,
  receiveFeedPost,
  receiveFeedReply,
} from '../feed/actions/index'

const NavBar = props => {
  const { location } = props
  const user = useSelector(state => state.userReducer.loggedInUser)
  const timeStamp = useSelector(
    state => state.userReducer.loggedInUser.notification_check
  )
  const socket = useSelector(state => state.socketReducer.socket)
  const { notifications, unread } = useSelector(state => state.notifyReducer)
  const dispatch = useDispatch()
  const [token] = useGetToken()
  const { loading } = useAuth0()
  const [searchOpen, setSearchOpen] = useState(false)

  const isMobile = useMediaQuery({
    query: Mobile,
  })

  const isTablet = useMediaQuery({
    query: Tablet,
  })

  useEffect(() => {
    if (user) {
      const fetchRequests = async () => {
        await dispatch(fetchPrivateRequests(token, { user_id: user.id }))
      }
      fetchRequests()
    }
  }, [user, dispatch, token])

  useEffect(() => {
    const fetchData = async () => {
      if (token && user) {
        try {
          const data = {
            userId: user.id,
          }
          if (!notifications.length) {
            const response = await dispatch(fetchNotifications(token, data))
            const unreadNum = response.filter(
              notify => notify.created_at > timeStamp || timeStamp === null
            ).length
            dispatch({
              type: SET_UNREAD_NOTIFICATION_NUM,
              payload: unreadNum,
            })
          }
          dispatch(fetchInvites(token, data))
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
    socket.on('new notification', async data => {
      console.log('new notification data', data)
      await dispatch(CreateNotification(data))
      if (location.pathname !== '/notifications') {
        dispatch({
          type: INCREMENT_UNREAD_NOTIFICATION_NUM,
          payload: 1,
        })
      }

      if (data.notification.type === 'group_accepted') {
        const group_id = data.notification.type_id
        dispatch(
          receivingGroup({
            user,
            group_id,
            fromGroupView: window.location.pathname.includes(
              `/group/${group_id}`
            ),
          })
        )
      }
    })
    socket.on('event', data => {
      console.log(data)
    })
    socket.on('new invite', async data => {
      await dispatch(createInvite(data))
      // i don't want to increment unread num if I am viewing the notifications
      if (location.pathname !== '/notifications') {
        dispatch({
          type: INCREMENT_UNREAD_NOTIFICATION_NUM,
          payload: 1,
        })
      }
    })
    socket.on('groupPost', data => {
      console.log('data', data)
      if (
        location.pathname ===
          `/post/${data.likeType ? data.likeType.post_id : data.post.id}` ||
        location.pathname === `/group/${data.room}`
      )
        if (data.type === 'like') {
          dispatch(receiveLike(data))
        } else if (data.type === 'dislike') {
          dispatch(receiveDislike(data))
        } else if (data.type === 'reply_like') {
          dispatch(receiveReplyLike(data))
        } else if (data.type === 'reply_dislike') {
          dispatch(receiveReplyDislike(data))
        } else {
          dispatch(receiveGroupPost(data))
        }
      else if (location.pathname === `/home`) {
        if (data.type === 'like') {
          dispatch(receiveFeedLike(data))
        } else if (data.type === 'dislike') {
          dispatch(receiveFeedDislike(data))
        } else if (data.post) {
          dispatch(receiveFeedPost(data))
        }
      }
    })
    socket.on('replyPost', data => {
      if (location.pathname === `/group/${data.room}`) {
        dispatch(receiveGroupReply(data))
      } else if (location.pathname === `/post/${data.reply.post_id}`) {
        dispatch(receivePostReply(data))
      } else if (location.pathname === `/home`) {
        dispatch(receiveFeedReply(data))
      }
    })
    return () => {
      socket.off('new notification')
      socket.off('new invite')
      socket.off('event')
      socket.off('groupPost')
      socket.off('replyPost')
    }
  }, [
    user,
    token,
    timeStamp,
    socket,
    dispatch,
    props.location.pathname,
    location.pathname,
    notifications.length,
  ])

  if (loading) {
    return (
      <Loader active size='large'>
        {' '}
        Loading{' '}
      </Loader>
    )
  }
  return (
    <>
      {isMobile ? (
        <>
          <StickyNav pointing secondary>
            <StyledMenuItem>
              <NavIcon
                name='search'
                size='large'
                style={{
                  fontSize: '1.8rem !important',
                  cursor: 'pointer',
                }}
                onClick={() => setSearchOpen(true)}
              />
              <Modal
                dimmer
                open={searchOpen}
                style={{
                  width: '100%',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  zIndex: '1',
                }}
                onClose={() => setSearchOpen(false)}
              >
                <StickyNav pointing secondary>
                  <StyledMenuItem>
                    <NavIcon
                      name='arrow left'
                      size='large'
                      style={{
                        fontSize: '1.8em',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSearchOpen(false)}
                    />
                  </StyledMenuItem>
                  <StyledMenuItem style={{ width: '80%' }}>
                    <NavSearch
                      resultSelectCallback={() => setSearchOpen(false)}
                    />
                  </StyledMenuItem>
                </StickyNav>
              </Modal>
            </StyledMenuItem>
            <Menu.Menu position='right'>
              <Navigation />
              <UserNav user={user} unread={unread} />
            </Menu.Menu>
          </StickyNav>
          {user && props.location.pathname !== '/profile' && <NavBottom />}
        </>
      ) : (
        <>
          <StickyNav pointing secondary>
              <StyledMenuItem
                style={{ width: isTablet ? '50%' : '25%', minWidth: '220px' }}
              >
                <NavSearch />
              </StyledMenuItem>
            <Menu.Menu position='right'>
              <Navigation />
              <UserNav user={user} unread={unread} />
            </Menu.Menu>
          </StickyNav>
          {user && props.location.pathname !== '/profile' && <NavBottom />}
        </>
      )}
    </>
  )
}

const NavIcon = styled(Icon)`
  color: #fff !important;
  opacity: 1 !important;
  &:hover {
    text-shadow: 0px 0px 2px #fff !important;
  }
`

const StickyNav = styled(Menu)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10 !important;
  font-family: 'Roboto', sans-serif !important;
  background-color: #4483cd !important;
  border-radius: 0px !important;
  border: none !important;
  font-size: 1.4rem !important;
  margin-bottom: 0 !important;
`

const StyledMenuItem = styled(Menu.Item)`
  align-self: center !important;
`

export default NavBar
