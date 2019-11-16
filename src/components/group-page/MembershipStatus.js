import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import useGetToken from '../utils/useGetToken'
import { Button, Chip } from '@material-ui/core/'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import styled from 'styled-components'

import {
  requestJoinPrivate,
  cancelRequestJoinPrivate,
  joinGroup,
  editUserMembership,
  leaveGroup,
} from 'actions'

const MembershipStatus = props => {
  const { user, group_id, members, privacy, memberType } = props
  const dispatch = useDispatch()

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  // Fetches user information from Redux
  const socket = useSelector(state => state.socketReducer.socket)
  const privateGroupRequests = useSelector(
    state => state.userReducer.pendingGroupRequests
  )

  async function joinGroupHandler(e) {
    e.preventDefault()
    await dispatch(joinGroup({ user, group_id, fromGroupView: true, socket }))
    await dispatch(editUserMembership({ user_type: 'member' }))
  }

  async function leaveGroupHandler(e) {
    e.preventDefault()
    await dispatch(leaveGroup({ user_id: user.id, group_id }))
    await dispatch(editUserMembership({ user_type: null }))
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
      {memberType && (
        <>
          {memberType === 'admin' && (
            <>
              <Chip
                variant='outlined'
                size='small'
                label='Admin'
                className={classes.chip}
              />
              <Button
                onClick={e => leaveGroupHandler(e)}
                variant='contained'
                size='small'
                className={classes.leave}
              >
                Leave
              </Button>
            </>
          )}
          {memberType === 'member' && (
            <>
              <Chip
                variant='outlined'
                size='small'
                label='Member'
                className={classes.chip}
              />
              <Button
                onClick={e => leaveGroupHandler(e)}
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
      {!memberType && (
        <>
          {privacy === 'public' && (
            <>
              <NotMember>Holder</NotMember>
              <Button
                onClick={e => joinGroupHandler(e)}
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
              {!privateGroupRequests.includes(group_id) ? (
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
