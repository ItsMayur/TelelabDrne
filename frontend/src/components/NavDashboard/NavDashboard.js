import React from "react";

const NavDashboard = (props) => {
  const userDetails = {
    name: props.name,
    email: props.email,
  };
  return (
    <div className="dashboardNav">
      <div>
        <h1>{props.pageHeading}</h1>
      </div>
      <div className="signedUserDetails">
        <div className="signedUserText">
          <p>
            Hello,
            <b>{userDetails.name}</b>
          </p>
          <p>{userDetails.email}</p>
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
