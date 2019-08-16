import React, { useEffect } from "react";
import "./App.css";

import { initGA, logPageView } from "./components/analytics/Analytics"

import Test from './components/Test'
import Mixpanel from './components/analytics/Mixpanel'

function App() {

	useEffect(() => {
		if (!window.GA_INITIALIZED) {
			initGA()
			window.GA_INITIALIZED = true
		}
		logPageView()
	}, [])

	return (
		<div className="App">
			<Mixpanel component={Test} />
		</div>
	);
}

export default App;
