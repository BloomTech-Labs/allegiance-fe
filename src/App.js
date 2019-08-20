import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";

import { initGA, logPageView } from "./components/analytics/Analytics";

import { useAuth0 } from "./components/auth/react-auth0-wrapper";

import Test from "./components/Test";
import Profile from "./components/profile/Profile";
import NavBar from "./components/nav/NavBar";
import ExternalApi from "./components/ExternalApi";

function App() {
	useEffect(() => {
		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
		}
		logPageView();
	}, []);

	const { loading } = useAuth0();

	if (loading) {
		return <div>Loading App...</div>;
	}

	return (
		<div className="App">
			<NavBar />
			<Route exact path="/" component={Test} />
			<PrivateRoute
				path="/profile"
				component={Profile}
			/>
			<PrivateRoute
				path="/external-api"
				component={ExternalApi} />
		</div>
	);
}

export default App;
