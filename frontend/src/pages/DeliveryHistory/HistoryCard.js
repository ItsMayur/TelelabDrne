import React from "react";
import "./deliveryHistory.css";

const HistoryCard = (props) => {
  // Function to see more details about the order
  const moreDetailsTab = () => {
    document.getElementById("moreDetailsCard").style.display = "Block";
  };
  // Function to hide elaborated details about the order on click to close
  const CloseHistoryCard = () => {
    document.getElementById("moreDetailsCard").style.display = "None";
  };
  return (
    <>
      {/* Elaborated Details card to be shown on Card click */}
      <div id="moreDetailsCard">
        <div id="CloseHistoryCard" onClick={CloseHistoryCard}>
          Close
        </div>
        <p>This is more detials Card {props.packageName}</p>
      </div>

      {/* Basic Card to be shown on page */}
      <div id="HistoryCard" onClick={moreDetailsTab}>
        <div className="mainHistoryContent">
          <h2>{props.packageName}</h2>
          <p>{props.packageWeight} Kg</p>
        </div>
        <div className="historyQuantity">
          <p>{props.packageQuantity}</p>
          <p>Quantity</p>
        </div>

        <div className="supportingHistoryContent">
          <div>
            <p>{props.packageOrderTime}</p>
            <p>Order Time</p>
          </div>
          <div>
            <p>{props.packageDeliveryTime}</p>
            <p>Delivery Time</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryCard;
