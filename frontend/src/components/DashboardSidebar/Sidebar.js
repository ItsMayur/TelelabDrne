import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = (props) => {
  const activeTab = props.activeLink;
  const LogoutUser = () => {
    // gapi.auth2.getAuthInstance().disconnect().then(navigate("/dashboard");)
  };
  // Function to make an active link in sidebar
  const SideBtns = document.querySelectorAll(".sidebarBtns");

  if (SideBtns.length) {
    SideBtns.forEach((link) => {
      link.addEventListener("click", (e) => {
        SideBtns.forEach((link) => {
          link.classList.remove("sidebarActiveLink");
          console.log("clicked");
        });
        link.classList.add("sidebarActiveLink");
        // e.preventDefault();
      });
    });
  }
  return (
    <div className="dashboardSidebar">
      <div className="compantName">BooDrone</div>
      <div className="sideButtons">
        <ul>
          <li className="sidebarBtns">
            <NavLink to="../Dashboard" active="sidebarActiveLink">
              Dashboard
            </NavLink>
          </li>
          <li className="sidebarBtns">
            <NavLink
              to="../DeliveryHistory"
              activeClassName="sidebarActiveLink"
            >
              Delivery History
            </NavLink>
          </li>
          <li className="sidebarBtns">
            <a href="#" onClick={LogoutUser}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
