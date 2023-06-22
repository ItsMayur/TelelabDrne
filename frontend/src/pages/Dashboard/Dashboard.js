import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate, Link } from "react-router-dom";
import AddDelivery from "./AddDelivery";
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import NavDashboard from "../../components/NavDashboard/NavDashboard";

const Dashboard = (props) => {
  // Function to log out user on click

  return (
    <div id="Dashboard">
      {/* Left side of the dashboard */}
      <Sidebar activeLink="Dashboard" />
      {/* Right side of the dashboard */}
      {/* Navbar that display page name and user credential */}
      <div className="mainDashboardPage">
        {/* Navbar of Dashboard */}
        <NavDashboard
          pageHeading="Dashboard"
          name={props.name}
          email={props.email}
          id={props.id}
        />

        {/* Mainpage for dashboard */}
        <div className="dashPage">
          <div className="dashCards">
            <AddDelivery
              heading="Add Delivery"
              name={props.name}
              email={props.email}
              id={props.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
