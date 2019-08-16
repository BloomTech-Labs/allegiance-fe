import React, { useEffect } from "react";
import NavBar from "./components/nav/NavBar";
import { useAuth0 } from "./components/auth/react-auth0-wrapper";
import "./App.css";

import { initGA, logPageView } from "./components/analytics/Analytics";

import Test from "./components/Test";
import Mixpanel from "./components/analytics/Mixpanel";

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
		return <div>Loading...</div>;
	}

	return (
		<div className="App">
			<Mixpanel component={Test} />
			<Mixpanel component={NavBar} />
		</div>
	);
}

export default App;
