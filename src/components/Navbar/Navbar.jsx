import React from "react";

import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Navbar.css";

const Navbar = props => (
  <header className="navbar">
    <nav className="navbar__navigation">
      <div className="navbar__logo">
        <a href="/">veganmeet</a>
      </div>
      <div className="spacer" />
      <div className="navbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="navbar_navigation-items">
        <ul>
          <li>
            <a href="/">New Posts</a>
          </li>
          <li>
            <a href="/">Create Post</a>
          </li>
          <li>
            <a href="/">Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Navbar;
