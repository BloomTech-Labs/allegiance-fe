import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'
import CssReset from 'styles/cssReset'
import PrivateRoute from './components/PrivateRoute'
import { initGA, logPageView } from './components/analytics/Analytics'
import { useAuth0 } from './components/auth/react-auth0-wrapper'
import useGetToken from './components/utils/useGetToken'
import NavBar from './components/nav/NavBar'
import * as types from 'actions/actionTypes'
import { updateSocket, fetchNotifications } from 'actions'

const Landing = lazy(() => import('components/Landing'))
const Profile = lazy(() => import('components/profile/Profile'))
const GroupContainer = lazy(() => import('components/groups/GroupContainer'))
const MakeProfile = lazy(() => import('components/profile/MakeProfile'))
const GroupPage = lazy(() => import('components/group-page/GroupPage'))
const CreateGroup = lazy(() => import('components/groups/CreateGroup'))
const UnderConstruction = lazy(() => import('components/UnderConstruction'))
const AddAllegiance = lazy(() => import('components/allegiances/AddAllegiance'))
const ReplyContainer = lazy(() => import('components/replies/ReplyContainer'))
const MakeAllegiance = lazy(() =>
  import('components/allegiances/MakeAllegiance')
)
const Feed = lazy(() => import('components/feed/Feed'))
const Notifications = lazy(() =>
  import('components/notifications/Notifications')
)
function App(props) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const socket = useSelector(state => state.socketReducer.socket)
  const notifications = useSelector(state => state.notifyReducer.notifications)
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

          // Mixpanel.login calls a mixpanel function that logs user id, name and the message of our choice.
          const { newUser, currentUser } = result.data.userInfo
          if (newUser) {
            props.history.push('/makeprofile')
          }

          if (currentUser && currentUser.first_name !== null) {
            const pushTo =
              window.location.pathname !== '/'
                ? window.location.pathname
                : '/home'
            props.history.push(`${pushTo}`)
            // Mixpanel.login(currentUser, 'Successful login.')
          }

          // dispatch(updateSocket(socket))
          const socketUserId = newUser ? newUser.id : currentUser.id
          socket.emit('join', {
            id: socketUserId,
          })
        } catch (err) {
          // Mixpanel.track('Unsuccessful login')
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
      <CssReset />
      {props.location.pathname !== '/' && <NavBar {...props} />}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Suspense fallback={null}>
          <Switch>
            <Route exact path='/' component={!isAuthenticated && Landing} />
            <Route exact path='/home' component={Feed} />
            <Route path='/groups' component={GroupContainer} />
            <PrivateRoute exact path='/makeprofile' component={MakeProfile} />
            <PrivateRoute exact path='/creategroup' component={CreateGroup} />
            <PrivateRoute exact path='/editgroup/:id' component={CreateGroup} />
            <PrivateRoute
              exact
              path='/notifications'
              component={Notifications}
            />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/group/:id' component={GroupPage} />
            <PrivateRoute
              exact
              path='/allegiance/:id'
              component={UnderConstruction}
            />
            <PrivateRoute
              exact
              path='/addallegiance'
              component={AddAllegiance}
            />
            <PrivateRoute
              exact
              path='/makeallegiance'
              component={MakeAllegiance}
            />
            <PrivateRoute exact path='/post/:id' component={ReplyContainer} />
          </Switch>
        </Suspense>
      </div>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  background-color: #dee4e7;
  min-height: 100vh;
`

export default withRouter(App)
// text-align: center;
// position: relative;
// background-color: #dee4e7;
// min-height: 100vh;
// margin: 0 auto;
// border: 4px solid blue;
