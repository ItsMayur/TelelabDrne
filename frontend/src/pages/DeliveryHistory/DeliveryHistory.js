import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavDashboard from "../../components/NavDashboard/NavDashboard";
import "./deliveryHistory.css";
import HistoryCard from "./HistoryCard";

const DeliveryHistory = (props) => {
  const [deliveryHistory, setDeliveryHistory] = useState([""]);

  // DELIVERY HISTORY FETCH REQUEST
  useEffect(() => {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    fetch(process.env.REACT_APP_BACKEND_URL + "deliveryHistory", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDeliveryHistory(data.DeliveryHistory);
      });
  }, []);

  return (
    <div id="DeliveryHistory">
      {/* LEFT SIDE */}
      <Sidebar activeLink="DeliveryHistory" />

      {/* RIGHT SIDE */}
      <div className="mainDashboardPage">
        {/* HEADING AND USER DETAILS*/}
        <NavDashboard
          pageHeading="Delivery History"
          Name={props.Name}
          Organisation={props.Organisation}
        />
        {/* DELIVERY HISTORY */}
        {deliveryHistory.map((data, idx) => (
          <HistoryCard
            packageName={data.packageName}
            packageWeight={data.packageWeight}
            packageQuantity={data.packageQuantity}
            packageOrderTime={data.packageOrderTime}
            packageDeliveryTime={data.packageDeliveryTime}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveryHistory;
