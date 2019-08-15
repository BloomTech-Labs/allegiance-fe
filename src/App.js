import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import createHistory from "history/createBrowserHistory";
import "./App.css";

const history = createHistory();
ReactGA.initialize("UA-145774968-0");
history.listen((location, action) => {
	ReactGA.pageview(location.pathname + location.search);
	console.log(location.pathname);
});

function App() {
	return (
		<Router history={history}>
			<div className="App">
				<header className="App-header">Welcome to Allegiance</header>
			</div>
		</Router>
	);
}

export default App;
