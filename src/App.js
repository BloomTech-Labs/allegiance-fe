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
import NavBar from './components/nav/NavBar'
import NavBottom from './components/nav/NavBottom'
import * as types from 'actions/actionTypes'
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
      // once variable user is defined - this if statement will be true
      console.log('in here ...')
      const registerUser = async () => {
        try {
          const result = await axios.post(process.env.REACT_APP_AUTHURL, {
            email: user.email,
            first_name: user.given_name,
            last_name: user.family_name,
            username: user.nickname,
            image: user.picture,
          })
          await dispatch({
            type: types.FETCH_LOGIN_SUCCESS,
            payload: result.data.userInfo,
          })
          if (result.data.userInfo.basicGroupInfo !== undefined) {
            await dispatch({
              type: types.FETCH_MY_GROUPS_SUCCESS,
              payload: result.data.userInfo.basicGroupInfo,
            })
          }
          // Mixpanel.login calls a mixpanel function that logs user id, name and the message of our choice.
          const { newUser, currentUser } = result.data.userInfo
          console.log(result.data.userInfo, '🕌')
          if (newUser) {
            props.history.push('/makeprofile')
          }
          if (currentUser) {
            const pushTo =
              window.location.pathname === '/'
                ? '/home'
                : window.location.pathname
            props.history.push(`${pushTo}`)
            // Mixpanel.login(currentUser, 'Successful login.')
          }
          // dispatch(updateSocket(socket))
          const socketUserId = newUser ? newUser.id : currentUser.id
          socket.emit('join', {
            id: socketUserId,
          })
        } catch (err) {
          console.log(err, '🌋')
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
      <div style={{ margin: '0 auto' }}>
        <NavBottom />
        <Suspense fallback={null}>
          <Switch>
            <Route exact path='/' component={!isAuthenticated && Landing} />
            <Route path='/home' component={Feed} />
            <Route path='/groups' component={GroupContainer} />
            <PrivateRoute path='/makeprofile' component={MakeProfile} />
            <PrivateRoute path='/creategroup' component={CreateGroup} />
            <PrivateRoute path='/editgroup/:id' component={CreateGroup} />
            <PrivateRoute path='/notifications' component={Notifications} />
            <PrivateRoute path='/profile' component={Profile} />
            <Route path='/group/:id' component={GroupPage} />
            <PrivateRoute
              path='/allegiance/:id'
              component={UnderConstruction}
            />
            <PrivateRoute path='/addallegiance' component={AddAllegiance} />
            <PrivateRoute path='/makeallegiance' component={MakeAllegiance} />
            <PrivateRoute path='/post/:id' component={ReplyContainer} />
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
