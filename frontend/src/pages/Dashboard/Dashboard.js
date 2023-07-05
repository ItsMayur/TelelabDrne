import React, { useEffect, useState } from "react";
import "./dashboard.css";
import AddDelivery from "./AddDelivery";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavDashboard from "../../components/NavDashboard/NavDashboard";

const Dashboard = (props) => {
  return (
    <div id="Dashboard">
      {/* LEFT SIDE OF DASHBOARD*/}
      <Sidebar activeLink="Dashboard" />

      {/* RIGHT SIDE OF DASHBOARD */}
      <div className="mainDashboardPage">
        {/* PAGE HEADING AND USER DETAILS */}
        <NavDashboard
          pageHeading="Dashboard"
          Name={props.Name}
          Organisation={props.Organisation}
        />

        {/* MAIN CONTENT */}
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
