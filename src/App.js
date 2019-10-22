import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'

import PrivateRoute from './components/PrivateRoute'

import { initGA, logPageView } from './components/analytics/Analytics'
import { Mixpanel } from './components/analytics/Mixpanel'

import { useAuth0 } from './components/auth/react-auth0-wrapper'
import useGetToken from './components/utils/useGetToken'

import Landing from './components/Landing'
import Profile from './components/profile/Profile'
import NavBar from './components/nav/NavBar'
import GroupContainer from './components/groups/GroupContainer'
import MakeProfile from './components/profile/MakeProfile'
import GroupPage from './components/group-page/GroupPage'
import CreateGroup from './components/groups/CreateGroup'
import UnderConstruction from './components/UnderConstruction'
import AddAllegiance from './components/allegiances/AddAllegiance'
import ReplyContainer from './components/replies/ReplyContainer'
import MakeAllegiance from './components/allegiances/MakeAllegiance'
import Feed from './components/feed/Feed'
import Notifications from './components/notifications/Notifications'

// import { LOGIN } from './reducers/userReducer'
import * as types from 'actions/actionTypes'
import { updateSocket } from 'actions/index'

function App(props) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const socket = useSelector(state => state.socketReducer.socket)
  const { loading, user, isAuthenticated } = useAuth0()

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])

  useEffect(() => {
    if (isAuthenticated && !loggedInUser && user && loading) {
      const registerUser = async () => {
        try {
          console.log(user)
          const result = await axios.post(process.env.REACT_APP_AUTHURL, {
            email: user.email,
            first_name: user.given_name,
            last_name: user.family_name,
            username: user.nickname,
            image: user.picture,
          })
          dispatch({
            type: types.FETCH_LOGIN_SUCCESS,
            payload: result.data.userInfo,
          })

          //Mixpanel.login calls a mixpanel function that logs user id, name and the message of our choice.
          const { newUser, currentUser } = result.data.userInfo
          if (newUser) {
            props.history.push('/makeprofile')
            Mixpanel.login(newUser, 'New user sign up.')
          }
          if (currentUser && currentUser.first_name === null) {
            props.history.push('/makeprofile')
            Mixpanel.login(currentUser, 'Successful login, no profile info.')
          }
          if (currentUser && currentUser.first_name !== null) {
            const pushTo =
              window.location.pathname !== '/'
                ? window.location.pathname
                : '/home'
            props.history.push(`${pushTo}`)
            Mixpanel.login(currentUser, 'Successful login.')
          }
          console.log(
            'joining socket',
            socket,
            '🧦',
            process.env.REACT_APP_DEPLOY_SERVER
          )
          // dispatch(updateSocket(socket))
          const socketUserId = newUser ? newUser.id : currentUser.id
          socket.emit('join', {
            id: socketUserId,
          })
        } catch (err) {
          Mixpanel.track('Unsuccessful login')
        }
      }
      registerUser()
    }
  })

  // Define moment display
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'seconds',
      ss: '%ss',
      m: 'a minute',
      mm: '%dm',
      h: 'an hour',
      hh: '%dh',
      d: 'a day',
      dd: '%dd',
      M: 'a month',
      MM: '%dM',
      y: 'a year',
      yy: '%dY',
    },
  })

  if (loading) {
    return (
      <Loader active size='large'>
        {' '}
        Loading{' '}
      </Loader>
    )
  }

  return (
    <AppContainer>
      <Switch>
        <Route exact path='/' component={!isAuthenticated && Landing} />
        <NavBar />
      </Switch>
      <Switch>
        <Route exact path='/home' component={Feed} />
        <PrivateRoute exact path='/makeprofile' component={MakeProfile} />
        <PrivateRoute exact path='/creategroup' component={CreateGroup} />
        <PrivateRoute exact path='/editgroup/:id' component={CreateGroup} />
        <PrivateRoute exact path='/notifications' component={Notifications} />
        <PrivateRoute exact path='/groups' component={GroupContainer} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/group/:id' component={GroupPage} />
        <PrivateRoute
          exact
          path='/allegiance/:id'
          component={UnderConstruction}
        />
        <PrivateRoute exact path='/addallegiance' component={AddAllegiance} />
        <PrivateRoute exact path='/makeallegiance' component={MakeAllegiance} />
        <PrivateRoute exact path='/post/:id' component={ReplyContainer} />
      </Switch>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  text-align: center;
  padding-top: 11%;
  padding-bottom: 12%;
`

export default withRouter(App)
