import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import avi from '../../assets/walter-avi.png'
import Moment from 'react-moment'
import { ThumbUp, ModeCommentOutlined, DeleteOutline } from '@material-ui/icons'
import { likePost, dislikePost } from 'actions'
import useGetToken from '../utils/useGetToken'
import { deleteGroupPost } from 'actions'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core/'
import styled from 'styled-components'

export default function PostCard(props) {
  const {
    first_name,
    last_name,
    image,
    id,
    post_content,
    user_id,
    likes,
    replies,
    created_at,
    group_id,
    group_name,
  } = props.post
  const { redirectToGroup } = props
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.loggedInUser)
  // Obtaining the current users status within the current group
  const socket = useSelector(state => state.socketReducer.socket)

  const [token] = useGetToken()
  const postLikeId = likes.find(like => like.user_id === user.id)

  const classes = useStyles()

  async function deletePost(e) {
    await dispatch(deleteGroupPost(token, id))
  }

  async function addLike(e) {
    const data = {
      user: user,
      id,
      user_id,
      group_id,
    }
    await dispatch(likePost(token, data, socket))
  }

  async function unLike(e) {
    await dispatch(dislikePost(token, postLikeId.id, group_id, socket))
  }

  const handleClick = () => {
    console.log('handleCLick')
    socket.emit('event', {
      name: `${user.first_name} ✈️`,
      room: 'FIVE FINGER POSSE',
    })
  }

  // *************change icon number to reg number*************
  return (
    <Card raised className={classes.card}>
      <CardHeader
        classes={{
          title: classes.title,
          avatar: classes.avatar,
        }}
        className={classes.cardHeader}
        avatar={
          <Avatar
            src={!image ? avi : image}
            className={classes.avatar}
            alt={'Avatar'}
          />
        }
        action={
          (user.id === user_id ||
            (props.group && props.group.memberType === 'admin')) &&
          !window.location.pathname.includes('/post') && (
            <IconButton onClick={e => deletePost(e)} aria-label='settings'>
              <DeleteOutline />
            </IconButton>
          )
        }
        title={
          <>
            <Link to={`/profile/${user_id}`}>
              {first_name} {last_name}
            </Link>

            {redirectToGroup && (
              <>
                <span style={{ fontWeight: '500' }}> posted in </span>
                <Link to={`/group/${group_id}`}>{group_name}</Link>
              </>
            )}
          </>
        }
        titleTypographyProps={{ fontSize: 25 }}
        subheader={
          <Tooltip
            className={classes.timestamp}
            title={
              <Moment className={classes.fullTimestamp} format='LLLL'>
                {created_at}
              </Moment>
            }
          >
            <Moment fromNow>{created_at}</Moment>
          </Tooltip>
        }
      />
      <CardContent>
        <Typography
          className={classes.typography}
          variant='body1'
          color='textSecondary'
          component='p'
          onClick={handleClick}
        >
          {post_content}
        </Typography>
      </CardContent>
      <CardActions className={classes.postActivity} disableSpacing>
        {!postLikeId && (
          <div>
            <IconButton
              className={classes.buttonDiv}
              aria-label='add to favorites'
              onClick={addLike}
              style={{ backgroundColor: 'transparent' }}
            >
              <ThumbUp className={classes.unlikedIcon} />
            </IconButton>
            <IconButton
              className={classes.likesCount}
              style={{ backgroundColor: 'transparent' }}
            >
              <h4 className='likes-count'> {likes.length} </h4>
            </IconButton>
          </div>
        )}
        {postLikeId && (
          <div>
            <IconButton
              className={classes.buttonDiv}
              aria-label='add to favorites'
              onClick={unLike}
              style={{ backgroundColor: 'transparent' }}
            >
              <ThumbUp
                className={classes.likedIcon}
                style={{ backgroundColor: 'transparent' }}
              />
            </IconButton>
            <IconButton
              className={classes.likesCount}
              style={{ backgroundColor: 'transparent' }}
            >
              <h4 className='likes-count'> {likes.length} </h4>
            </IconButton>
          </div>
        )}
        <div>
          <Link to={`/post/${id}`}>
            <IconButton
              aria-label='share'
              className={classes.buttonDiv}
              style={{ backgroundColor: 'transparent' }}
            >
              <ModeCommentOutlined />
            </IconButton>
            <IconButton
              className={classes.likesCount}
              style={{ backgroundColor: 'transparent' }}
            >
              {replies && <Replies> {` ${replies.length} Replies`} </Replies>}
            </IconButton>
          </Link>
        </div>
      </CardActions>
    </Card>
  )
}

const Replies = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #6c6c6c;
`

const primary = '#4267b2'
const useStyles = makeStyles(theme => ({
  card: {
    width: '95%',
    maxWidth: '800px',
    marginBottom: 20,
  },
  cardHeader: {
    padding: 0,
    borderBottom: '1px solid lightgray',
  },
  postActivity: {
    justifyContent: 'space-between',
    borderTop: '1px solid lightgray',
    padding: 0,
    paddingLeft: 10,
    paddingRight: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  avatar: {
    margin: '1%',
    width: 60,
    height: 60,
  },
  typography: {
    fontSize: '1.6rem',
    color: 'black',
  },
  timestamp: {
    fontSize: '1.2rem',
  },
  fullTimestamp: {
    fontSize: '1rem',
  },
  buttonDiv: {
    paddingRight: 1,
    paddingBottom: 3,
  },
  likedIcon: {
    margin: 0,
    marginBottom: 3,
    padding: 1,
    color: primary,
    paddingRight: 0,
  },
  unlikedIcon: {
    margin: 0,
    marginBottom: 3,
    padding: 1,
    color: 'grey',
    paddingRight: 0,
  },
  likesCount: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 4,
    marginBottom: 1,
  },
}))
