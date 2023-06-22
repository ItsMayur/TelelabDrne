import React from "react";
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import NavDashboard from "../../components/NavDashboard/NavDashboard";
import "./deliveryHistory.css";
import HistoryCard from "./HistoryCard";

const DeliveryHistory = (props) => {
  return (
    <div id="DeliveryHistory">
      {/* Left Sidebar of the page */}
      <Sidebar activeLink="DeliveryHistory" />

      {/* Right Side of the page */}
      <div className="mainDashboardPage">
        <NavDashboard pageHeading="Delivery History" />
        {/* DeliveryHistory Cards here */}
        {props.deliveryHistory.map((data, idx) => (
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
