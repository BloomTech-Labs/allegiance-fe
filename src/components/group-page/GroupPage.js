import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as types from 'actions/actionTypes'
import GroupInfo from './GroupInfo'
import PostsContainer from '../posts/PostsContainer'
import { fetchGroup, fetchGroupPosts, fetchUserMembership } from 'actions'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { Loader } from 'semantic-ui-react'
import BlockedView from '../posts/BlockedView'
import NotFound from 'components/NotFound'

const GroupPage = props => {
  // Defines id to be group id from params
  const id = parseInt(props.match.params.id)
  const user = useSelector(state => state.userReducer.loggedInUser)
  const group = useSelector(state => state.group)
  const { memberType, posts } = group
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
    return () => {
      dispatch({ type: types.CLEAR_POSTS })
    }
  }, [user, dispatch, id])

  if (Object.keys(group).length === 0) {
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )
  }

  if (!group.id) {
    return <NotFound />
  }

  return (
    <GroupPageContainer>
      <PaperWrapper>
        <PaperContainer elevation={3}>
          <GroupInfo
            group={group}
            members={group.members}
            allegiances={group.allegiances}
            requests={group.reqs}
          />
        </PaperContainer>
      </PaperWrapper>
      {group.privacy_setting === 'public' ||
      memberType === 'member' ||
      memberType === 'admin' ? (
        group.arePostsLoading ? (
          <Loader size='large' active></Loader>
        ) : (
          <PostsContainer
            groupId={id}
            memberType={memberType}
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

const PaperWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const GroupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #e8edf1;
`
const PaperContainer = styled(Paper)`
  padding-top: 25px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  width: 95%;
  max-width: 850px;
`
export default GroupPage
