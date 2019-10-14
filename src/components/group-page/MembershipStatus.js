import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { ADD_GROUP, LEAVE_GROUP } from '../../reducers/userReducer'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { makeStyles } from '@material-ui/core/styles'
import useGetToken from '../utils/useGetToken'
import { Button, Chip } from '@material-ui/core/'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'

import { Mixpanel } from '../analytics/Mixpanel'

import styled from 'styled-components'

const MembershipStatus = props => {
  const [userType, setUserType] = useState()
  const [relation, setRelation] = useState()
  const dispatch = useDispatch()

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  // Fetches user information from Redux
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)

  useEffect(() => {
    // Fetch user type and groups_users id
    const fetchDataUserType = async () => {
      if (token) {
        const response = await axiosWithAuth([token]).post(
          `/groups_users/search`,
          {
            user_id: loggedInUser.id,
            group_id: props.group_id,
          }
        )
        if (response.data.relationExists) {
          setUserType(response.data.relationExists[0].user_type)
          setRelation(response.data.relationExists[0].id)
        } else {
          setUserType('non-member')
        }
      }
    }
    fetchDataUserType()
  }, [token, props.group_id, loggedInUser, userType])

  async function joinGroup(e) {
    e.preventDefault()
    if (token) {
      const result = await axiosWithAuth([token]).post(`/groups_users`, {
        user_id: loggedInUser.id,
        group_id: props.group_id,
        user_type: 'member',
      })
      if (result.data.newGroupUsers) {
        setUserType('member')
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
        dispatch({ type: ADD_GROUP, payload: addedGroup })
        props.setTrigger(true)
        Mixpanel.activity(loggedInUser.id, 'Joined Group')
      }
    }
  }

  async function joinGroupInvite(e) {
    e.preventDefault()
    if (token) {
      const result = await axiosWithAuth([token]).put(
        `/groups_users/${relation}`,
        {
          user_id: loggedInUser.id,
          group_id: props.group_id,
          user_type: 'member',
        }
      )
      if (result.data.updated) {
        setUserType('member')
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
        dispatch({ type: ADD_GROUP, payload: addedGroup })
        props.setTrigger(true)
        Mixpanel.activity(loggedInUser.id, 'Joined Group')
      }
    }
  }

  async function leaveGroup(e) {
    e.preventDefault()
    if (token) {
      const result = await axiosWithAuth([token]).delete(
        `/groups_users/${relation}`
      )
      if (
        result.data.message === 'The user to group pairing has been deleted.'
      ) {
        setUserType('non-member')
        dispatch({ type: LEAVE_GROUP, payload: props.group_id })
        props.setTrigger(true)
        Mixpanel.activity(loggedInUser.id, 'Left Group')
      }
    }
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
      {userType && (
        <>
          {userType === 'admin' && (
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
          {userType === 'invited' && (
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
          {userType === 'member' && (
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
      {userType === 'non-member' && props.privacy !== 'hidden' && (
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
