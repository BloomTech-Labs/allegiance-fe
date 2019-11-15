import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { Loader } from 'semantic-ui-react'
import ContentFeedCard from './ContentFeedCard'
import LikeFeedCard from './LikeFeedCard'
import { Link } from 'react-router-dom'
import { fetchFeed } from './actions/index'

import undrawFans from '../../assets/undraw/undrawFans.svg'
import PostCard from 'components/posts/PostCard'

const Feed = () => {
  const userGroups = useSelector(state => state.myGroups)
  const userId = useSelector(state => state.userReducer.loggedInUser.id)
  const feed = useSelector(state => state.feedReducer.posts)
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch feed related data
    if (userGroups && userGroups.length > 0) {
      const data = {
        group_id: userGroups.map(group => group.id),
        interval: 48,
      }
      console.log(data);
      dispatch(fetchFeed(data))
    }
  }, [userGroups])

  // <Loader active size='large'>
  //   {' '}
  //   Loading{' '}
  // </Loader>
  // Filter feed for activity by user
  const filteredFeed = feed.filter(act => userId !== act.user_id).map(act => {
    return {
      ...act,
      image: act.user_image || act.image
    }
  })

  return feed.length === 0 ? (
    <FansDiv>
      {/* <Header>Your feed is currently empty...</Header>
      <br /> */}
      <Link to='/groups'>
        <JoinBtn>Select a group to join!</JoinBtn>
      </Link>
      <Img src={undrawFans} />
    </FansDiv>
  ) : (
    <Container>
      {filteredFeed.map(activity => <PostCard key={activity.id} post={activity} />)}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const JoinBtn = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  &:hover {
    background: #4483cd;
    cursor: pointer;
  }
  height: 54px;
  width: 192px;
  border: none;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
  background: #ed5959;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
`

export default Feed
