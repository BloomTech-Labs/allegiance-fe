import React, { useState, useEffect } from 'react'
// import { axiosWithoutAuth } from '../utils/axiosWithoutAuth'
import useGetToken from '../utils/useGetToken'
import { useDispatch, useSelector } from 'react-redux'
import * as types from 'actions/actionTypes'
import GroupInfo from './GroupInfo'
import PostsContainer from '../posts/PostsContainer'
import { fetchGroup, fetchGroupPosts } from 'actions'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { Loader, Dimmer } from 'semantic-ui-react'
import BlockedView from '../posts/BlockedView'
const GroupPage = props => {
  // Fetches Auth0 token for axios call
  // const [token] = useGetToken()
  // Defines id to be group id from params
  const id = parseInt(props.match.params.id)
  const userGroups = useSelector(state => state.userReducer.loggedInGroups)
  // const [group, setGroup] = useState({})
  const group = useSelector(state => state.group)
  const posts = group.posts
  const [allegiances, setAllegiances] = useState([])
  const [members, setMembers] = useState([])
  const [requests, setRequests] = useState([])
  const [trigger, setTrigger] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    // Fetch group related data
    const fetchData = async () => {
      // if (true) {
      try {
        dispatch(fetchGroup(id))
        // const response = await fetchGroup(id)
        // add token to fetchGroupPosts
        dispatch(fetchGroupPosts(id))
        // setRequests(response.reqs)
        // dispatch({ type: types.FETCH_GROUP_SUCCESS, payload: id })
        // setTrigger(false)
      } catch (err) {
        dispatch({ type: types.FETCH_GROUP_FAILURE, payload: err })
        // setTrigger(false)
      }
      // }
    }
    fetchData()
    return () => dispatch({ type: types.CLEAR_POSTS })
  }, [id, dispatch, trigger])
  if (Object.keys(group).length === 0) {
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )
  }
  // checking to see if current user is a member of current group
  const currentUserType = userGroups.find(group => group.id === id)
  // if they are undefined, we set membership to a string so we don't get an error
  let membership
  if (currentUserType === undefined) {
    membership = 'non-member'
  } else {
    membership = currentUserType.user_type
  }
  return (
    <GroupPageContainer>
      <PaperContainer elevation={3}>
        <GroupInfo
          group={group}
          members={group.members}
          allegiances={group.allegiances}
          setTrigger={setTrigger}
          requests={group.reqs}
        />
      </PaperContainer>
      {group.privacy_setting === 'public' ||
      membership === 'member' ||
      membership === 'admin' ? (
        group.arePostsLoading 
        ? <Loader size='large' active></Loader> 
        : <PostsContainer groupId={id} members={members} posts={posts} />
      ) : (
        <BlockedView />
      )}
    </GroupPageContainer>
  )
}
const GroupPageContainer = styled.div`
  display: flex;
  border: 2px solid pink;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #dee4e7;
  min-height: 87vh;
  justify-content: flex-start;
`
const PaperContainer = styled(Paper)`
  margin-bottom: 5%;
`
export default GroupPage
