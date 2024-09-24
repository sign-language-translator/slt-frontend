import React from "react";
import { NavLink } from "react-router-dom";

import "./sidebar.css";
import sidebar_routes from "./sidebar_routes";

const SidebarItem = (props) => {
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner`}>
        {props.icon}
        <span>{props.title}</span>
      </div>
    </div>
  );
};
export default function Sidebar() {

  return (
    <div className="sidebar">
      {sidebar_routes.map((item, index) => (
        <NavLink to={item.route} key={index}>
          <SidebarItem title={item.display_name} icon={item.icon} />
        </NavLink>
      ))}

    </div>
  );
};
