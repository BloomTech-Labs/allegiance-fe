import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import PrivateRoute from "./components/PrivateRoute";

import { initGA, logPageView } from "./components/analytics/Analytics";

import { useAuth0 } from "./components/auth/react-auth0-wrapper";

import Test from "./components/Test";
import Profile from "./components/profile/Profile";
import NavBar from "./components/nav/NavBar";
import GroupContainer from "./components/groups/GroupContainer";
import MakeProfile from "./components/profile/MakeProfile"

import { LOGIN } from "./actions";

function App(props) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
  const { loading, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  useEffect(() => {
    if (isAuthenticated && !loggedInUser && user) {
      const registerUser = async () => {
        const result = await axios.post(
          "https://labs15-allegiance-staging.herokuapp.com/api/auth/",
          { email: user.email }
        );
        dispatch({ type: LOGIN, payload: result.data.currentUser || result.data.newUser });
        if (result.data.newUser) {
          props.history.push('/makeprofile')
        }
      };
      registerUser();
    }
  }, [isAuthenticated, user, loggedInUser, dispatch, props.history]);

  if (loading) {
    return <div>Loading App...</div>;
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Test} />
        <Route exact path='/makeprofile' component={MakeProfile} />
        <PrivateRoute exact path="/groups" component={GroupContainer} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
