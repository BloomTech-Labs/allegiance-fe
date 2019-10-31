import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from '@material-ui/core/'
import avi from '../../assets/walter-avi.png'
import blueGrey from '@material-ui/core/colors/blueGrey'
import red from '@material-ui/core/colors/red'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { Mixpanel } from '../analytics/Mixpanel'

const blue = blueGrey[500]
const primary = red[500]
const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  member: {
    borderBottom: '1px solid lightgray',
  },
  text: {
    fontWeight: 'bolder',
    textAlign: 'center',
  },
  avatar: {
    margin: 1,
    width: 60,
    height: 60,
  },
  remove: {
    color: primary,
  },
  names: {
    fontSize: 15,
  },
  trigger: {
    margin: theme.spacing(1),
    backgroundColor: blue,
    marginTop: 1,
  },
}))

const MembersList = props => {
  // Defines membership status for logged in user

  const userGroups = useSelector(state => state.userReducer.loggedInGroups)
  const group_id = props.group_id
  const userStatus =
    userGroups.filter(group => group.id === group_id).length > 0
      ? userGroups.filter(group => group.id === group_id)[0].user_type
      : null

  // Retrieve current logged in userId
  const user = useSelector(state => state.userReducer.loggedInUser)
  const userId = user.id
  const socket = useSelector(state => state.socketReducer.socket)
  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  const classes = useStyles()
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  async function removeMember(e, user_id) {
    e.preventDefault()
    if (token) {
      const result = await axiosWithAuth([token]).delete(`/groups_users/`, {
        data: {
          user_id,
          group_id,
        },
      })
      if (
        result.data.message === 'The user to group pairing has been deleted.'
      ) {
        props.setTrigger(true)
      }
    }
  }

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [side]: open })
  }

  async function addToGroup(e, user_id) {
    e.preventDefault()
    if (token) {
      try {
          const deleted = await axiosWithAuth([token]).delete(`/private/group/${group_id}/${user_id}`)
          if (deleted) {
            const notification = await axiosWithAuth([token]).post(
              `/users/${user_id}/notifications`,
              {
                user_id,
                invoker_id: userId,
                type_id: group_id,
                type: 'group_accepted',
              }
            )
            console.log('emit socket', notification);
            socket.emit('send notification', {
              userIds: [user_id],
              notification: {
                ...notification.data,
                first_name: user.first_name,
                last_name: user.last_name,
                image: user.image,
              },
            })
            props.setTrigger(true)
          }
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function declineRequest(e, user_id) {
    e.preventDefault()
    try {
      const deleted = await axiosWithAuth([token]).delete(`/private/group/${group_id}/${user_id}`)
      if (deleted) {
        props.setTrigger(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Sorting members list alphabetically
  props.members.sort((a, b) => (a.name < b.name ? -1 : 1))
  // Sorting list by membership status to put admins at the top
  const sortedMembers = props.members.sort((a, b) =>
    a.status < b.status ? -1 : 1
  )

  const sideList = side => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {userStatus === 'admin' && props.requests.map(member => (
          <ListItem button key={member.id} className={classes.member}>
            <ListItemIcon>
              <Avatar
                className={classes.avatar}
                src={!member.image ? avi : member.image}
                alt={'User Avatar'}
              />
            </ListItemIcon>
            <ListItemText primary={`${member.first_name} ${member.last_name}`} className={classes.text} />
            {member.id !== userId && (
              <>
                <CheckCircleOutlineIcon 
                  onClick={e => {
                    addToGroup(e, member.id)
                  }}
                />
                <HighlightOffIcon
                  onClick={e => {
                    declineRequest(e, member.id)
                  }}
                  className={classes.remove}
                />
              </>
            )}
          </ListItem>
        ))}
        {sortedMembers.map(member => (
          <ListItem button key={member.id} className={classes.member}>
            <ListItemIcon>
              <Avatar
                className={classes.avatar}
                src={!member.image ? avi : member.image}
                alt={'User Avatar'}
              />
            </ListItemIcon>
            <ListItemText primary={member.name} className={classes.text} />
            {userStatus === 'admin' && member.id !== userId && (
              <HighlightOffIcon
                onClick={e => removeMember(e, member.id)}
                className={classes.remove}
              />
            )}
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <Button
        onClick={toggleDrawer('right', true)}
        variant='contained'
        size='small'
        className={classes.trigger}
      >
        {props.members.length}{' '}
        {props.members.length === 1 ? 'Member' : 'Members'}
      </Button>
      <SwipeableDrawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {sideList('right')}
      </SwipeableDrawer>
    </div>
  )
}

export default MembersList
