import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { Menu, Icon } from "semantic-ui-react";

import styled from "styled-components";

const NavBar = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const [activeItem, setActiveItem] = useState("");

	return (
		<>
			<TopNav>
				<p>Title</p>
			</TopNav>
			{/* If user is not authenticated, show log in button */}
			{!isAuthenticated && (
				<button onClick={() => loginWithRedirect({})}>Log in</button>
			)}
			<BottomNav>
				{/* If user is authenticated, show links to navigate app */}
				{isAuthenticated && (
					<Nav style={{ backgroundColor: "#1b4570" }}>
						<NavLeft>
							<Menu.Item
								as={Link}
								name="Home"
								to="/"
								onClick={() => setActiveItem("Home")}
								active={activeItem === "Home"}
							>
								<NavIcon size="large" name="home" />
							</Menu.Item>
							<Menu.Item
								as={Link}
								name="Groups"
								to="/groups"
								onClick={() => setActiveItem("Groups")}
								active={activeItem === "Groups"}
							>
								<NavIcon size="large" name="group" />
							</Menu.Item>
							<Menu.Item
								as={Link}
								name="Notifications"
								to="/notifications"
								onClick={() => setActiveItem("Notifications")}
								active={activeItem === "Notifications"}
							>
								<NavIcon size="large" name="bell outline" />
							</Menu.Item>
							<Menu.Item
								as={Link}
								name="Profile"
								to="/profile"
								onClick={() => setActiveItem("Profile")}
								active={activeItem === "Profile"}
							>
								<NavIcon size="large" name="user" />
							</Menu.Item>
						</NavLeft>
						<NavRight>
							<Menu.Item
								style={{ color: "white", fontWeight: "bold" }}
								name="Logout"
								onClick={() => logout()}
							>
								Logout
							</Menu.Item>
						</NavRight>
					</Nav>
				)}
			</BottomNav>
		</>
	);
};

const TopNav = styled.div`
	display: flex;
	justify-content: center;
	height: 6%;
	align-items: center;
	font-weight: bold;
	color: white;
	position: fixed;
	background-color: #1b4570;
	top: 0;
	width: 100%;
	z-index: 2;
	-webkit-transition: height 0.2s ease-in-out;
	transition: height 0.2s ease-in-out;
`;

const BottomNav = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 2;
	-webkit-transition: height 0.2s ease-in-out;
	transition: height 0.2s ease-in-out;
`;

const Nav = styled(Menu)`
	display: flex;
	justify-content: space-between;
	// targeting pseudo element from semantic ui Menu element to remove empty string
	&&:after {
		display: none;
	}
`;

const NavIcon = styled(Icon)`
	color: white;
`;

const NavLeft = styled.div`
	display: flex;
`;

const NavRight = styled.div`
	display: flex;
	color: white;
`;

export default NavBar;
