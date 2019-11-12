import React from 'react'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Typography,
  Tooltip,
} from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    width: '60vw',
    marginBottom: 20,
    margin: 'auto',
  },
  avatar: {
    marginRight: 15,
    marginLeft: 15,
  },
  headerAvatar: {
    marginRight: 4,
    marginLeft: 0,
    height: 20,
    width: 20,
  },
  button: {
    color: 'white',
    backgroundColor: '#1B4570',
  },
  content: {
    color: 'black',
    fontSize: 18,
  },
  groupAvatar: {
    marginRight: 15,
    marginLeft: 0,
    height: 20,
    width: 20,
  },
})

const LikeFeedCard = props => {
  const classes = useStyles()

  // Destructure props to gain access to keys
  const {
    // note: various other key/value pairs available, see postman documentation
    liker_name,
    liker_image,
    group_id,
    post_id,
    post_content,
    reply_id,
    reply_content,
    created_at,
    tag,
    group_image,
    acronym,
  } = props.activity

  const goToGroup = e => {
    e.preventDefault()
    e.stopPropagation()
    props.history.push(`/group/${group_id}`)
  }

  const goToPost = e => {
    e.stopPropagation()
    props.history.push({
      pathname: `/post/${post_id}`,
      replyNumber: reply_id,
    })
  }

  return (
    <LikeCardDiv onClick={e => goToPost(e)}>
      <Card className={classes.card} raised={true}>
        <HeaderDiv>
          <HeaderIcon>
            <ThumbUpOutlinedIcon className={classes.avatar} />
          </HeaderIcon>
          <HeaderContent>
            <Avatar
              className={classes.headerAvatar}
              src={liker_image}
              alt={`${liker_name}'s Image`}
            />
            <Typography>
              <span>{liker_name}</span>{' '}
              {tag === 'postLike' && 'liked a post...'}
              {tag === 'replyLike' && 'liked a reply...'}
            </Typography>
          </HeaderContent>
        </HeaderDiv>

        <CardActionArea>
          <CardContent>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              className={classes.content}
            >
              {tag === 'postLike' && post_content}
              {tag === 'replyLike' && reply_content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Footer>
          <FooterTimeStamp>
            <Tooltip title={<Moment format='LLLL'>{created_at}</Moment>}>
              <Moment fromNow>{created_at}</Moment>
            </Tooltip>
          </FooterTimeStamp>
          <GroupFooter onClick={e => goToGroup(e)}>
            <Avatar
              aria-label='recipe'
              className={classes.groupAvatar}
              src={group_image}
              alt={'Group Image'}
            />
            <p>{acronym}</p>
          </GroupFooter>
        </Footer>
      </Card>
    </LikeCardDiv>
  )
}

const LikeCardDiv = styled.div`
  width: 100vw;
  margin: auto;
`

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 0.4rem;
  text-align: left;
  border-bottom: 1px solid lightgrey;
  p {
    color: gray;
    span {
      text-transform: capitalize;
    }
  }
`

const HeaderIcon = styled.div`
  width: 15%;
`

const HeaderContent = styled.div`
  width: 80%;
  display: flex;
  margin-right: 2%;
  overflow: hidden;
`

const FooterTimeStamp = styled.div`
  width: 22%;
  text-align: left;
  color: grey;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1% 6% 2% 4%;
  margin-top: 2px;
  border-top: 1px solid lightgrey;
`

const GroupFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: black;
  }
`

export default withRouter(LikeFeedCard)
