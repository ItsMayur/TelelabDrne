import { Loader } from "@googlemaps/js-api-loader";
import { React, useState, useEffect, useRef } from "react";
import NewMap from "./NewMap";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polygon,
} from "@react-google-maps/api";

import "./dashboard.css";
const loader = new Loader({
  apiKey: "AIzaSyAzie1a-9pIB9k5cpQbwPHRnqI4gQFmS-Y",
  version: "weekly",
  libraries: ["places"],
});

// const mapOptions = {
//   center: {
//     lat: 0,
//     lng: 0,
//   },
//   zoom: 4,
// };
// const myLatLng = { lat: 30.745, lng: 76.786 };

// loader
//   .load()
//   .then((google) => {
//     map = new google.maps.Map(document.getElementById("map"), mapOptions);
//   })
//   .catch((e) => {
//     // do something
//   });

// Dummy data for longitude and latitude of drones

const Drones = [
  {
    lat: 30.741,
    lng: 76.78,
  },
  {
    lat: 30.731,
    lng: 76.788,
  },
  {
    lat: 30.741,
    lng: 76.886,
  },
];

// MAP variable
let map;
// Constant to set properties of circle of 1 km radius around person
const options = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "red",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 2,
};

// Load map from api
const AddDelivery = (props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // Center Variable to get current location
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const userLocationDetails = {
    lat: lat,
    lng: lng,
  };

  // Function to show request drop button on rightclick
  const showRequestDrop = () => {
    console.log("Requested Drop");
  };
  // Function to show map
  const displayMap = () => {
    if (navigator.geolocation) {
      document.getElementById("DeliveryMap").style.display = "Flex";
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  };

  // Function to request drop
  const requestDrop = () => {
    fetch("http://localhost:5000/store", {
      method: "POST",
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(userLocationDetails),
    }).then(function (response) {
      console.log(response);
      return response.json();
    });
  };
  // Function to close map on click
  const CloseMapEvent = () => {
    document.getElementById("DeliveryMap").style.display = "none";
  };
  // To check if the location is inside the triangle or not
  const isInsidePoligon = (userPosition, Polygon) => {
    console.log(
      window.google.maps.geometry.poly.containsLocation(userPosition, Polygon)
    );
  };

  // To check is it loaded or not
  if (!isLoaded) {
    return <div>Loading..</div>;
  }
  // ////////////////////////////////////////////////
  return (
    <div className="dashCard">
      <h1>{props.heading}</h1>
      <button onClick={displayMap}>Request Drop</button>
      <div className="MapBox">
        <div id="DeliveryMap">
          <div id="CloseMapBtn" onClick={CloseMapEvent}>
            Close map
          </div>
          <div className="deliveryMapButtons">
            <ul>
              <li>
                <a onClick={requestDrop}>Request Drop here</a>
              </li>
            </ul>
          </div>
          <GoogleMap
            center={userLocationDetails}
            zoom={15}
            mapContainerStyle={{ width: "100vw", height: "100vh" }}
          >
            {Drones.map((data, idx) => (
              <Marker position={data}></Marker>
            ))}

            {/* User location marker */}
            <Marker position={userLocationDetails}></Marker>
            <Polygon
              onLoad={isInsidePoligon(userLocationDetails, Drones)}
              paths={Drones}
              options={options}
            />
          </GoogleMap>
          {/* <NewMap /> */}
        </div>
      </div>
    </div>
  );
};
export default AddDelivery;
