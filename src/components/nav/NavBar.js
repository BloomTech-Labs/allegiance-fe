import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../auth/react-auth0-wrapper";

const NavBar = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	return (
		<div>
			{/* If user is authenticated, show links to navigate app */}
			{isAuthenticated && (
				<>
					<Link to="/">Home</Link>&nbsp;
					<Link to="/profile">Profile</Link>
					<Link to="/external-api">External API</Link>
				</>
			)}

			{/* If user is not authenticated, show log in button */}
			{!isAuthenticated && (
				<button onClick={() => loginWithRedirect({})}>Log in</button>
			)}

			{/* If user is authenticated, show log out button */}
			{isAuthenticated && <button onClick={() => logout()}>Log out</button>}
		</div>
	);
};

export default NavBar;
