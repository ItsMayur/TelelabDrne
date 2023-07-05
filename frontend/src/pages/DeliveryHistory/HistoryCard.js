import React from "react";
import "./deliveryHistory.css";

const HistoryCard = (props) => {
  // MORE CARD DETAILS
  const moreDetailsTab = () => {
    document.getElementById("moreDetailsCard").style.display = "Block";
  };
  // CLOSE MORE CARD DETIALS
  const CloseHistoryCard = () => {
    document.getElementById("moreDetailsCard").style.display = "None";
  };
  return (
    <>
      {/* MORE CARD DETAILS */}
      <div id="moreDetailsCard">
        <div id="CloseHistoryCard" onClick={CloseHistoryCard}>
          Close
        </div>
        <p>This is more detials Card {props.packageName}</p>
      </div>

      {/*DELIVERY HISTORY CARD*/}
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
