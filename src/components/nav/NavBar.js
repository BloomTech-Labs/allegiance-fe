import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { Menu } from "semantic-ui-react";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [activeItem, setActiveItem] = useState("");

  return (
    <div>
      {/* If user is authenticated, show links to navigate app */}
      {isAuthenticated && (
        <Menu>
          <Menu.Item
            as={Link}
            name="Home"
            to="/"
            active={activeItem === "Home"}
          >
            Home
          </Menu.Item>
          <Menu.Item
            as={Link}
            name="Groups"
            to="/groups"
            active={activeItem === "Groups"}
          >
            Groups
          </Menu.Item>
          <Menu.Item
            as={Link}
            name="Profile"
            to="/profile"
            active={activeItem === "Profile"}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            as={Link}
            name="Notifications"
            to="/notifications"
            active={activeItem === "Notifications"}
          >
            Notifications
          </Menu.Item>
          <Menu.Item
            as={Link}
            name="Logout"
            onClick={() => logout()}
            active={activeItem === "Logout"}
          >
            {!isAuthenticated ? " Login" : "Logout"}
          </Menu.Item>
        </Menu>
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
