import React, { useEffect } from "react";
import "./App.css";

import { initGA, logPageView } from "./components/analytics/Analytics"


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
			Home
		</div>
	);
}

export default App;
