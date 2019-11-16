import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { fetchFeed } from './actions/index'

import undrawFans from '../../assets/undraw/undrawFans.svg'
import PostCard from 'components/posts/PostCard'

const Feed = () => {
  const userGroups = useSelector(state => state.myGroups)
  const userId = useSelector(state => state.userReducer.loggedInUser.id)
  const feed = useSelector(state => state.feedReducer.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch feed related data
    if (userGroups && userGroups.length > 0) {
      const data = {
        group_id: userGroups.map(group => group.id),
        interval: 48,
      }
      console.log(data)
      dispatch(fetchFeed(data))
    }
  }, [userGroups, dispatch])

  const filteredFeed = feed
    .filter(act => userId !== act.user_id)
    .map(act => {
      return {
        ...act,
        image: act.user_image || act.image,
      }
    })

  return filteredFeed.length === 0 ? (
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
      <H3>MY FEED</H3>
      {filteredFeed.map(activity => (
        <PostCard key={activity.id} post={activity} redirectToGroup={true} />
      ))}
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

const FansDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Img = styled.img`
  max-width: 800px;
  width: 100%;
`

const JoinBtn = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  &:hover {
    background: #4483cd;
    cursor: pointer;
    text-shadow: 0px 0px 2px #fff !important;
  }
  height: 54px;
  width: 192px;
  border: none;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
  background: #1a4571;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
`
const H3 = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  margin: 1% 0;
  font-family: 'Roboto', sans-serif;
`

export default Feed
