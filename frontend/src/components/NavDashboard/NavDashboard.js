import React from "react";

const NavDashboard = (props) => {
  const userDetails = {
    Name: props.Name,
    Organisation: props.Organisation,
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
            <b>{userDetails.Name}</b>
          </p>
          <p>{userDetails.Organisation}</p>
        </div>
        <div className="signedUserPic">
          <img src="" alt="" srcset="" />
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;
