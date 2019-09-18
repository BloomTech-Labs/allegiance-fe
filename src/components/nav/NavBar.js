import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { Menu, Icon } from "semantic-ui-react";
import IconButton from "@material-ui/core/IconButton";
import { ArrowBack } from "@material-ui/icons";

const NavBar = () => {
	const { isAuthenticated, logout } = useAuth0();
	const [activeItem, setActiveItem] = useState("");
	// Obtain last viewed replies thread's group_id
	const groupId = useSelector(state => state.navReducer.groupID);
	console.log(groupId);

	const logoutWithRedirect = () =>
		logout({
			returnTo: window.location.origin
		});

	const { pathname } = window.location
	const TopNavItem = (label, link, title) => (
		<>
			<IconBut
				aria-label={label}
				as={Link}
				to={link}
				style={{ color: "white", marginTop: "1%" }}>
				<ArrowBack />
			</IconBut>
			<p>{title}</p>
			<TopNavRight />
		</>)

	return (
		<>
			<TopNav>
				{pathname === "/home" && <p>Home</p>}
				{pathname === "/groups" && <p>Groups</p>}
				{pathname.includes("/group/") && TopNavItem("back to groups", "/groups", "Group")}
				{pathname === "/creategroup" && <p>Create Group</p>}
				{pathname === "/notifications" && <p>Notifications</p>}
				{pathname === "/profile" && <p>Profile</p>}
				{pathname === "/makeprofile" && TopNavItem("back to profile", "/profile", "Edit Profile")}
				{pathname.includes("/editgroup/") && TopNavItem("back to group", groupId === 0 ? "/groups" : `/group/${groupId}`, "Edit Group")}
				{pathname.includes("/post") && TopNavItem("back to group", `/group/${groupId}`, "Post")}
				{pathname === "/makeallegiance" && <p>Edit Allegiances</p>}
			</TopNav>
			<BottomNav>
				{/* If user is authenticated, show links to navigate app */}
				{isAuthenticated && (
					<Nav style={{ backgroundColor: "#1b4570", borderRadius: 0 }}>
						<NavLeft>
							<Menu.Item
								as={Link}
								name="Home"
								to="/home"
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
								onClick={() => logoutWithRedirect()}
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
	border-radius: 0;
	p {
		width: 70%;
		margin: 0;
	}
	@media (max-width: 320px) {
		max-width: 320px
	}
`;

const IconBut = styled(IconButton)`
	width: 15%;
`;

const TopNavRight = styled.div`
	width: 15%;
`;

const BottomNav = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 2;
	-webkit-transition: height 0.2s ease-in-out;
	transition: height 0.2s ease-in-out;
	border-radius: 0;
	max-height: 8%;
	@media (max-width: 320px) {
		max-width: 320px
	}
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