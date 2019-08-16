import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./components/Home"
import Layout from "./components/Layout"

function App() {

	return (
		<Router>
			<Layout>
				<div className="App">
					<Route exact path='/' component={Home} />
				</div>
			</Layout>
		</Router>
	);
}

export default App;
