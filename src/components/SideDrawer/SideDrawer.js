import React from "react";

import "./SideDrawer.css";

const sideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
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
    </nav>
  );
};

export default sideDrawer;
