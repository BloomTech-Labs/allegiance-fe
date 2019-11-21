import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Icon, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ProfileAllegiances from './ProfileAllegiances'
import useGetToken from '../utils/useGetToken'
import { fetchProfile, fetchProfilePosts } from './store/profileActions'
import defaultBanner from 'assets/defaultBanner.jpg'
import { Typography } from '@material-ui/core'
import Default from '../../assets/walter-avi.png'
import MyGroups from './MyGroups'
import { ProfilePosts } from './ProfilePosts'
import NotFound from 'components/NotFound'

const Profile = props => {
  const dispatch = useDispatch()
  const [token] = useGetToken()
  const profile = useSelector(state => state.profile)
  const loggedInUserId = useSelector(state => state.userReducer.loggedInUser.id)
  const id = window.location.pathname.split('/profile/')[1]

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(id))
      dispatch(fetchProfilePosts(id))
    }
  }, [id, token, dispatch])

  if (!profile) {
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )
  }

  if (!profile.id) {
    return <NotFound />
  }

  return (
    <ProfileContainer>
      <div>
        <img
          className='banner_img'
          src={profile.banner_image || defaultBanner}
          alt='Banner'
        />
      </div>
      <div className='img_crop'>
        {profile.image ? (
          <img className='profile_img' src={profile.image} alt='Profile' />
        ) : (
          <Icon
            name='football ball'
            size='huge'
            circular
            style={{ fontSize: '5.3rem' }}
          />
        )}
      </div>

      <InfoHolder>
        <div className='name'>
          {profile.first_name && (
            <Typography
              variant='h1'
              noWrap={true}
              style={{
                fontWeight: 'bold',
                paddingBottom: '10px',
                fontSize: '4rem',
              }}
            >{`${profile.first_name} ${profile.last_name}`}</Typography>
          )}
        </div>
        <Bio>{profile.username && <h1>{profile.bio}</h1>}</Bio>

        <div className='name'>
          {props.match.url === '/profile' && (
            <Link to='/makeprofile'>Profile Settings</Link>
          )}
        </div>
        <div className='alleg-group-container'>
          <h2>ALLEGIANCES</h2>
          <ProfileAllegiances
            loggedInUserId={loggedInUserId}
            user={profile.id}
            name={profile.first_name}
            content={profile.allegiances}
            type='allegiance'
            default={Default}
          />
          <h2>GROUPS</h2>
          <MyGroups content={profile.groups} />
        </div>
        <div className='lower-div'>
          <h2>POSTS</h2>
          <ProfilePosts name={profile.first_name} posts={profile.posts} />
        </div>
      </InfoHolder>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
  max-width: 100%;
  .banner_img {
    width: 100%;
    border-bottom: 10px solid black;
    max-height: 225px;
    object-fit: cover;
  }
  .img_crop {
    width: 150px;
    height: 150px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid white;
    margin-top: -8rem;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
  }
  .profile_img {
    object-fit: cover;
    width: 150px;
    height: 150px;
  }
`

const InfoHolder = styled.div`
  .name {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
  }
  .alleg-group-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    font-size: 2.8rem;
    margin-top: 15px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .groupDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lower-div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const Bio = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
  font-size: 1.8rem;
`

export default Profile
