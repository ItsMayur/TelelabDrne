import React from "react";

const NavDashboard = (props) => {
  return (
    <div className="dashboardNav">
      <div>
        <h1>{props.pageHeading}</h1>
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
  );
};

export default NavDashboard;
