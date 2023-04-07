import React from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import Dashcard from "./Dashcard";

const Dashboard = () => {
  const navigate = useNavigate();
  // Function to log out user on click
  const LogoutUser = () => {
    // gapi.auth2.getAuthInstance().disconnect().then(navigate("/dashboard");)
  };

  return (
    <div id="Dashboard">
      {/* Left side of the dashboard */}
      <div className="dashboardSidebar">
        <div className="compantName">BooDrone</div>
        <div className="sideButtons">
          <ul>
            <li className="sidebarActiveLink">
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Delivery History</a>
            </li>
            <li>
              <a href="#" onClick={LogoutUser}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Right side of the dashboard */}
      {/* Navbar that display page name and user credential */}
      <div className="mainDashboardPage">
        {/* Navbar of Dashboard */}
        <div className="dashboardNav">
          <div>
            <h1>Dashboard</h1>
          </div>
          <div className="signedUserDetails">
            <div className="signedUserText">
              <p>
                Hello,<b>Username {/* user.getBasicProfile().getName()) */}</b>
              </p>
              <p>Organisation </p>
            </div>
            <div className="signedUserPic">
              <img
                src=""
                /* user.getBasicProfile.getImageUrl()) */ alt=""
                srcset=""
              />
            </div>
          </div>
        </div>
        {/* Mainpage for dashboard */}
        <div className="dashPage">
          <div className="dashCards">
            <Dashcard heading="Hey" />
            <Dashcard />
            <Dashcard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
