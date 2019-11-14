import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Icon, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ProfileAllegiances from './ProfileAllegiances'
import PostCard from '../posts/PostCard'
import axios from 'axios'
import useGetToken from '../utils/useGetToken'
import { fetchProfile, fetchProfilePosts } from './store/profileActions'
import defaultBanner from 'assets/defaultBanner.jpg'
import { Typography } from '@material-ui/core'
import Default from '../../assets/walter-avi.png'
import ProfilePostsCard from './ProfileAllegiances'

const Profile = props => {
  const dispatch = useDispatch()
  const [token] = useGetToken()
  const profile = useSelector(state => state.profile)
  const posts = profile.posts
  const id = window.location.pathname.split('/profile/')[1]
  const loggedInAllegiances = useSelector(
    state => state.userReducer.loggedInAllegiances
  )

  useEffect(() => {
    if (profile && token) {
      dispatch(fetchProfile(id))
      dispatch(fetchProfilePosts(id))
    }
  }, [token, dispatch])

  if (!profile) {
    return (
      <Loader active size='large'>
        Loading
      </Loader>
    )
  }

  return (
    <ProfileContainer>
      <div style={{ maxWidth: '100%' }}>
        <Banner>
          <BannerImage
            src={profile.banner_image || defaultBanner}
            alt='Banner'
          />
        </Banner>
        <ImageCrop>
          {profile.image ? (
            <ProfileImage src={profile.image} alt='Profile' />
          ) : (
            <Icon
              name='football ball'
              size='huge'
              circular
              style={{ fontSize: '5.3rem' }}
            />
          )}
        </ImageCrop>
        <InfoHolder>
          <Name>
            {profile.username && (
              <Typography
                variant='h5'
                noWrap={true}
                style={{ fontWeight: 'bold' }}
              >{`${profile.username}`}</Typography>
            )}
          </Name>
          <Name>
            {props.match.url === '/profile' && (
              <Link to='/makeprofile'>Profile Settings</Link>
            )}
          </Name>
          {/* <p>{loggedInUser.bio}</p> */}
          <>
            <div
              className='select'
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '5px',
              }}
            >
              <Link to='/addallegiance'>
                <JoinBtn>Select your allegiances</JoinBtn>
              </Link>
            </div>

            <H2>MY ALLEGIANCES</H2>

            <ProfileAllegiances
              content={loggedInAllegiances || []}
              type='allegiance'
              default={Default}
            />
            <div className='lower-div'>
              {profile.posts.map(post => {
                return <PostCard post={post} />
              })}
            </div>
          </>
        </InfoHolder>
      </div>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
`
const Banner = styled.div``

const BannerImage = styled.img`
  width: 100%;
  border-bottom: 10px solid black;
  max-height: 225px;
  object-fit: cover;
`
const InfoHolder = styled.div`
  margin-top: 5%;
  .select {
    border-bottom: 3px inset grey;
  }
  .lower-div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
const Name = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;
`
const ImageCrop = styled.div`
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
`
const ProfileImage = styled.img`
  object-fit: cover;
  width: 150px;
  height: 150px;
`
const H2 = styled.h2`
  font-size: 2rem;
  margin-top: 10px;
  margin-bottom: 10px;
`
const H3 = styled.h3`
  padding-left: 20px;
  font-size: 3rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
`
const JoinBtn = styled.button`
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
  @media (max-width: 500px) {
    width: 90%;
  }
`
export default Profile
