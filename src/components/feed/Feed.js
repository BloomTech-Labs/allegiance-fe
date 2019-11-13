import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { Loader } from 'semantic-ui-react'
import ContentFeedCard from './ContentFeedCard'
import LikeFeedCard from './LikeFeedCard'
import { Link } from 'react-router-dom'

import undrawFans from '../../assets/undraw/undrawFans.svg'

const Feed = () => {
  const [feed, setFeed] = useState([])
  const userGroups = useSelector(state => state.myGroups)
  const userId = useSelector(state => state.userReducer.loggedInUser.id)

  // Fetches Auth0 token for axios call
  const [token] = useGetToken()

  useEffect(() => {
    // Fetch feed related data
    const mappedGroupIds = userGroups.map(group => {
      return group.id
    })
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axiosWithAuth([token]).post(`/feed`, {
            group_id: mappedGroupIds,
            interval: 48,
          })
          setFeed(response.data.allActivity)
        } catch {}
      }
    }
    fetchData()
  }, [token, userGroups])

  // <Loader active size='large'>
  //   {' '}
  //   Loading{' '}
  // </Loader>
  // Filter feed for activity by user
  const filteredFeed = feed.filter(
    act => userId !== act.user_id && userId !== act.liker_id
  )

  return feed.length === 0 ? (
    <FansDiv>
      {/* <Header>Your feed is currently empty...</Header>
      <br /> */}
      <Link to='/groups'>
        <Header>Select a group to join!</Header>
      </Link>
      <Img src={undrawFans} />
    </FansDiv>
  ) : (
    <Container>
      {filteredFeed.map(activity => {
        return (
          <FeedContainer key={activity.tag + activity.id}>
            {(activity.tag === 'post' || activity.tag === 'reply') && (
              <ContentFeedCard activity={activity} />
            )}
            {(activity.tag === 'postLike' || activity.tag === 'replyLike') && (
              <LikeFeedCard activity={activity} />
            )}
          </FeedContainer>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  background-color: #e8edf1;
`

const MyGroups = styled(Paper)`
  background-color: white;
  margin-bottom: 3rem;
`

const GroupTitleHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #e8edf1;
  h3 {
    margin: 0 1%;
  }
`

const H3 = styled.h3`
  padding-top: 10px;
  font-size: 3rem;
  font-weight: bold;
  margin: 1% 0;
`

const FeedContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`
const FansDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100vw;
`

const Img = styled.img`
  width: 70vw;
  height: 70vh;
`

const Header = styled.h1`
  margin-top: 10px;
  padding: 10px;
  font-size: 3rem;
  font-weight: 700;
`

export default Feed
