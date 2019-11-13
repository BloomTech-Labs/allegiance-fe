import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Icon, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MyAllegianceGroups from './MyAllegianceGroups'
import axios from 'axios'
import useGetToken from '../utils/useGetToken'
import * as types from './store/profileTypes'
import defaultBanner from 'assets/defaultBanner.jpg'
import { Typography } from '@material-ui/core'
import Default from '../../assets/walter-avi.png'

const Profile = props => {
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const loggedInGroups = useSelector(state => state.myGroups)
  console.log('loggedInUser', loggedInUser)
  console.log('loggedInGroups', loggedInGroups)
  const loggedInAllegiances = useSelector(
    state => state.userReducer.loggedInAllegiances
  )
  const dispatch = useDispatch()

  const [token] = useGetToken()

  useEffect(() => {
    if (loggedInUser && token) {
      const fetchData = async () => {
        try {
          dispatch({ type: types.FETCH_PROFILE_REQUEST })
          const result = await axios.post(process.env.REACT_APP_AUTHURL, {
            email: loggedInUser.email,
          })
          dispatch({
            type: types.FETCH_PROFILE_SUCCESS,
            payload: result.data.userInfo,
          })
        } catch (err) {
          dispatch({ type: types.FETCH_PROFILE_FAILURE, payload: err })
          console.log("There was an issue retrieving the user's profile.")
        }
      }
      fetchData()
    }
  }, [loggedInUser, token, dispatch])

  if (!loggedInUser) {
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
            src={loggedInUser.banner_image || defaultBanner}
            alt='Banner'
          />
        </Banner>
        <ImageCrop>
          {loggedInUser.image ? (
            <ProfileImage src={loggedInUser.image} alt='Profile' />
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
            {loggedInUser.username && (
              <Typography
                variant='h5'
                noWrap={true}
                style={{ fontWeight: 'bold' }}
              >{`${loggedInUser.username}`}</Typography>
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
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '5px',
              }}
            >
              <Link to='/addallegiance'>Select your allegiances</Link>
            </div>
            <H2>MY ALLEGIANCES</H2>
            <MyAllegianceGroups
              content={loggedInAllegiances || []}
              type='allegiance'
              default={Default}
            />
            <h2>Posts</h2>
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

export default Profile
