import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import createHistory from "history/createBrowserHistory";
import "./App.css";

import Home from "./components/Home"
import Analytics from "./components//analytics/Analytics"

const history = createHistory();
ReactGA.initialize("UA-145774968-1");
history.listen((location, action) => {
	ReactGA.pageview(window.location.pathname + window.location.search);
	console.log(window.location.pathname);
});

function App() {
	return (
		<Router history={history}>
			<div className="App">
				<Route exact path='/' component={Home} />
				<Route path='/analytics' component={Analytics} />
			</div>
		</Router>
	);
}

export default App;
