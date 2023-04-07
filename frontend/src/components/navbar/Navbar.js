import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  // Javascript function to check valid user and redirect user to dashboard
  const checkValidUser = () => {
    //   if (auth2.isSignedIn.get()) {
    //     await var profile = auth2.currentUser.get().getBasicProfile();
    //   }
    navigate("/dashboard");
  };

  return (
    // This navbar will show when user enter to the side for first time

    // Company name towards left
    <div id="FirstNavbar">
      <div className="companyName">
        <p>BooDrone</p>
      </div>

      {/* Navbar buttons */}
      <div className="firstNavBtns">
        <ul>
          <li>
            <a href="#">Dashboard</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Why US?</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>

      {/* Google SignIn Button */}
      <div className="googleSignIn">
        <a onClick={checkValidUser}>Google Sign In</a>
      </div>
    </div>
  );
};

export default Navbar;
