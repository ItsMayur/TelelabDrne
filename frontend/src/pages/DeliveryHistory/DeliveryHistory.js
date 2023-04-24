import React from "react";
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import NavDashboard from "../../components/NavDashboard/NavDashboard";
import "./deliveryHistory.css";
import HistoryCard from "./HistoryCard";

const DeliveryHistoryData = [
  {
    packageName: "Name 1",
    packageWeight: " 3.12",
    packageQuantity: "30",
    packageOrderTime: "24/06/2023",
    packageDeliveryTime: "28/06/2023",
  },
  {
    packageName: "Name 1",
    packageWeight: " 3.12",
    packageQuantity: "30",
    packageOrderTime: "24/06/2023",
    packageDeliveryTime: "28/06/2023",
  },
  {
    packageName: "Name 2",
    packageWeight: " 3.222",
    packageQuantity: "323",
    packageOrderTime: "24/06/2023",
    packageDeliveryTime: "28/06/2023",
  },
  {
    packageName: "Name 3",
    packageWeight: " 5.125",
    packageQuantity: "3",
    packageOrderTime: "24/07/2023",
    packageDeliveryTime: "28/07/2023",
  },
];

const DeliveryHistory = () => {
  return (
    <div id="DeliveryHistory">
      {/* Left Sidebar of the page */}
      <Sidebar activeLink="DeliveryHistory" />

      {/* Right Side of the page */}
      <div className="mainDashboardPage">
        <NavDashboard pageHeading="Delivery History" />
        {/* DeliveryHistory Cards here */}
        {DeliveryHistoryData.map((data, idx) => (
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
