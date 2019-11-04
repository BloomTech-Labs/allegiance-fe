import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import * as types from 'actions/actionTypes'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { makeStyles } from '@material-ui/core/styles'
import useGetToken from '../utils/useGetToken'
import { Button, Chip } from '@material-ui/core/'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'

import { Mixpanel } from '../analytics/Mixpanel'

import styled from 'styled-components'

import {
  requestJoinPrivate,
  cancelRequestJoinPrivate,
} from 'actions'
import axios from 'axios'

const MembershipStatus = props => {
  const { user, group_id, members, privacy, memberType, setMemberType, setTrigger } = props;
  const dispatch = useDispatch()

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  // Fetches user information from Redux
  const socket = useSelector(state => state.socketReducer.socket)
  const privateGroupRequests = useSelector(
    state => state.userReducer.pendingGroupRequests
  )
  let hasRequest = privateGroupRequests.includes(group_id)

  useEffect(() => {
    console.log('hasRequest?', hasRequest)
    hasRequest = privateGroupRequests.includes(group_id)
  }, [privateGroupRequests])

  async function joinGroup(e) {
    e.preventDefault()
    if (token) {
      try {
        const result = await axiosWithAuth([token]).post(`/groups_users`, {
          user_id: user.id,
          group_id,
          user_type: 'member',
        })
        if (result.data.newGroupUsers) {
          setMemberType('member')
          const {
            group_name,
            group_image,
            group_id,
            user_type,
          } = result.data.newGroupUsers
          const addedGroup = {
            name: group_name,
            image: group_image,
            id: group_id,
            user_type: user_type,
          }
          dispatch({ type: types.ADD_GROUP_SUCCESS, payload: addedGroup })
          setTrigger(true)
          Mixpanel.activity(user.id, 'Joined Group')
        }
      } catch (err) {
        console.log(err)
        dispatch({ type: types.ADD_GROUP_FAILURE, payload: err })
      }
    }
  }

  async function joinGroupInvite(e) {
    e.preventDefault()
    if (token) {
      try {
        const result = await axiosWithAuth([token]).put(
          `/groups_users/${memberType.relationId}`,
          {
            user_id: user.id,
            group_id,
            user_type: 'member',
          }
        )
        if (result.data.updated) {
          setMemberType('member')
          const {
            group_name,
            group_image,
            group_id,
            user_type,
          } = result.data.updated
          const addedGroup = {
            name: group_name,
            image: group_image,
            id: group_id,
            user_type: user_type,
          }
          // should be group invite, new actions
          dispatch({ type: types.ADD_GROUP_SUCCESS, payload: addedGroup })
          setTrigger(true)
          // Mixpanel.activity(loggedInUser.id, 'Joined Group')
        }
      } catch (err) {
        console.log(err)
        dispatch({ type: types.ADD_GROUP_FAILURE, payload: err })
      }
    }
  }

  async function leaveGroup(e) {
    e.preventDefault()
    if (token) {
      const result = await axiosWithAuth([token]).delete(
        `/groups_users/${memberType.relationId}`
      )
      if (
        result.data.message === 'The user to group pairing has been deleted.'
      ) {
        setMemberType({})
        dispatch({ type: types.LEAVE_GROUP_SUCCESS, payload: group_id })
        setTrigger(true)
        // Mixpanel.activity(loggedInUser.id, 'Left Group')
      }
    }
  }

  async function requestPrivate(e) {
    e.preventDefault()
    const data = {
      user,
      privateGroupID: group_id,
      adminIds: members.reduce((acc, member) => {
        if (member.status === 'admin') {
          acc.push(member.id)
        }
        return acc
      }, []),
    }
    console.log('adminIds:', data)
    await dispatch(requestJoinPrivate(token, data, socket))
  }

  async function cancelRequestPrivate(e) {
    e.preventDefault()
    const data = {
      userId: user.id,
      privateGroupID: group_id,
    }
    await dispatch(cancelRequestJoinPrivate(token, data))
  }

  const primary = red[600]
  const accent = blue[400]
  const useStyles = makeStyles(theme => ({
    leave: {
      margin: theme.spacing(1),
      backgroundColor: primary,
    },
    join: {
      margin: theme.spacing(1),
      backgroundColor: accent,
      marginTop: 1,
    },
    chip: {
      margin: theme.spacing(1),
      marginBottom: 1,
    },
  }))

  const classes = useStyles()

  return (
    <GroupMemberStatus>
      {memberType.userType && (
        <>
          {memberType.userType === 'admin' && (
            <>
              <Chip
                variant='outlined'
                size='small'
                label='Admin'
                className={classes.chip}
              />
              <Button
                onClick={e => leaveGroup(e)}
                variant='contained'
                size='small'
                className={classes.leave}
              >
                Leave
              </Button>
            </>
          )}
          {memberType.userType === 'invited' && (
            <>
              <Chip
                variant='outlined'
                size='small'
                label='Invited'
                className={classes.chip}
              />
              <Button
                onClick={e => joinGroupInvite(e)}
                variant='contained'
                size='small'
                className={classes.join}
              >
                Join
              </Button>
            </>
          )}
          {memberType.userType === 'member' && (
            <>
              <Chip
                variant='outlined'
                size='small'
                label='Member'
                className={classes.chip}
              />
              <Button
                onClick={e => leaveGroup(e)}
                variant='contained'
                size='small'
                className={classes.leave}
              >
                Leave
              </Button>
            </>
          )}
        </>
      )}
      {!memberType.userType && (
        <>
          {privacy === 'public' && (
            <>
              <NotMember>Holder</NotMember>
              <Button
                onClick={e => joinGroup(e)}
                variant='contained'
                size='small'
                className={classes.join}
              >
                Join
              </Button>
            </>
          )}
          {privacy !== 'public' && (
            <>
              {!hasRequest ? (
                <>
                  <NotMember>Holder</NotMember>
                  <Button
                    onClick={e => requestPrivate(e)}
                    variant='contained'
                    size='small'
                    className={classes.join}
                  >
                    Request to Join
                  </Button>
                </>
              ) : (
                <>
                  <NotMember>Holder</NotMember>
                  <Button
                    onClick={e => cancelRequestPrivate(e)}
                    variant='contained'
                    size='small'
                    className={classes.join}
                  >
                    Cancel Request
                  </Button>
                </>
              )}
            </>
          )}
        </>
      )}
    </GroupMemberStatus>
  )
}

const GroupMemberStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const NotMember = styled.div`
  margin: 13.1% auto;
  width: 80%;
  color: white;
`

export default MembershipStatus
