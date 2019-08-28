import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { Menu, Icon } from "semantic-ui-react";

import styled from "styled-components";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [activeItem, setActiveItem] = useState("");

  return (
    <div>
      {/* If user is authenticated, show links to navigate app */}
      {isAuthenticated && (
        <Nav style={{ backgroundColor: "#1b4570" }}>
          <NavLeft>
            <Menu.Item
              as={Link}
              name="Home"
              to="/"
              active={activeItem === "Home"}
            >
              <NavIcon size="large" name="home" />
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="Groups"
              to="/groups"
              active={activeItem === "Groups"}
            >
              <NavIcon size="large" name="group" />
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="Notifications"
              to="/notifications"
              active={activeItem === "Notifications"}
            >
              <NavIcon size="large" name="bell outline" />
            </Menu.Item>
            <Menu.Item
              as={Link}
              name="Profile"
              to="/profile"
              active={activeItem === "Profile"}
            >
              <NavIcon size="large" name="user" />
            </Menu.Item>
          </NavLeft>
          <NavRight>
            <Menu.Item
              style={{ color: "white", fontWeight: "bold" }}
              as={Link}
              name="Logout"
              onClick={() => logout()}
              active={activeItem === "Logout"}
            >
              Logout
            </Menu.Item>
          </NavRight>
        </Nav>
      )}

      {/* If user is not authenticated, show log in button */}
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {/* If user is authenticated, show log out button */}
      {/* {isAuthenticated && <button onClick={() => logout()}>Log out</button>} */}
    </div>
  );
};

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
