import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as types from 'actions/actionTypes'
import GroupInfo from './GroupInfo'
import PostsContainer from '../posts/PostsContainer'
import { fetchGroup, fetchGroupPosts, fetchUserMembership } from 'actions'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { Loader } from 'semantic-ui-react'
import BlockedView from '../posts/BlockedView'

const GroupPage = props => {
  // Defines id to be group id from params
  const id = parseInt(props.match.params.id)
  const user = useSelector(state => state.userReducer.loggedInUser)
  const group = useSelector(state => state.group)
  const { memberType, posts } = group
  const [members, setMembers] = useState([])
  const [trigger, setTrigger] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    // Fetch group related data
    const fetchData = async () => {
      try {
        dispatch(fetchGroup(id))
        dispatch(fetchGroupPosts(id))
      } catch (err) {
        dispatch({ type: types.FETCH_GROUP_FAILURE, payload: err })
      }
    }

    if (user && user.id) {
      dispatch(fetchUserMembership({ group_id: id, user_id: user.id }))
    }
    fetchData()
    return () => dispatch({ type: types.CLEAR_POSTS })
  }, [user])

  if (Object.keys(group).length === 0) {
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )
  }

  return (
    <GroupPageContainer>
      <PaperContainer elevation={3}>
        <GroupInfo
          group={group}
          members={group.members}
          allegiances={group.allegiances}
          trigger={trigger}
          setTrigger={setTrigger}
          requests={group.reqs}
        />
      </PaperContainer>
      {group.privacy_setting === 'public' ||
      memberType === 'member' ||
      memberType === 'admin' ? (
        group.arePostsLoading ? (
          <Loader size='large' active></Loader>
        ) : (
          <PostsContainer
            groupId={id}
            memberType={memberType}
            members={members}
            posts={posts}
            group={group}
          />
        )
      ) : (
        <BlockedView />
      )}
    </GroupPageContainer>
  )
}
const GroupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #dee4e7;
  min-height: 87vh;
  justify-content: flex-start;
`
const PaperContainer = styled(Paper)`
  // margin-bottom: 5%;
  padding-top: 25px
  display: flex;
  justify-content: center;
`
export default GroupPage
