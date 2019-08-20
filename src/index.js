import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./components/auth/react-auth0-wrapper";

import { BrowserRouter as Router } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider } from "react-mixpanel";

mixpanel.init("0a656753e6651e53814b19a9ad2bc9c5");

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
	window.history.replaceState(
		{},
		document.title,
		appState && appState.targetUrl
			? appState.targetUrl
			: window.location.pathname
	);
};

ReactDOM.render(
	<Auth0Provider
		domain={process.env.REACT_APP_DOMAIN}
		client_id={process.env.REACT_APP_CLIENTID}
		audience={process.env.REACT_APP_AUDIENCE}
		redirect_uri={window.location.origin}
		onRedirectCallback={onRedirectCallback}
	>
		<MixpanelProvider mixpanel={mixpanel}>
			<Router>
				<App />
			</Router>
		</MixpanelProvider>
	</Auth0Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
