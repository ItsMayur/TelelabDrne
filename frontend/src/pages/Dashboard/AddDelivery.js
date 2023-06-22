import { Loader } from "@googlemaps/js-api-loader";
import { React, useState, useCallback } from "react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polyline,
  Polygon,
} from "@react-google-maps/api";

import "./dashboard.css";
const loader = new Loader({
  apiKey: "AIzaSyAzie1a-9pIB9k5cpQbwPHRnqI4gQFmS-Y",

  version: "weekly",
  libraries: ["places"],
});

// Load map from api
const AddDelivery = (props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // VARIABLES USED IN CODE

  // Dummy data for longitude and latitude of drones
  const Drones = [
    {
      lat: 30.74,
      lng: 76.78,
    },
    {
      lat: 30.731,
      lng: 76.788,
    },
    {
      lat: 30.741,
      lng: 76.86,
    },
  ];
  // Center Variable to get current
  const [nearestDrone, setNearestDrone] = useState({
    lat: "",
    lng: "",
    distance: "",
  });

  const [NearbyDronesVisibilty, setNearbyDronesVisibilty] = useState(false);
  const [sendDroneLocationLat, setSendDroneLocationLat] = useState("");
  const [sendDroneLocationLng, setSendDroneLocationLng] = useState("");
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const userLocationDetails = {
    lat: lat,
    lng: lng,
  };
  const sendDroneLocation = {
    lat: sendDroneLocationLat,
    lng: sendDroneLocationLng,
  };

  // FUNCTIONS USED IN CODE

  // MAP variable

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

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
    {
      // REQUEST DROP STATUS FOR STAGE 1 AND 2
      document.getElementById("Stage1").classList.remove("activeDeliveryStep");
      document.getElementById("Stage2").classList.add("activeDeliveryStep");
      // SEARCHING FOR DRONES NEARBY WITH LEAST DISTANCE
      setNearbyDronesVisibilty(true);
      Drones.map((drone, idx) => {
        if (distanceEligibilty(drone, sendDroneLocation) <= 1) {
          if (nearestDrone.distance == "") {
            setNearestDrone({
              lat: drone.lat,
              lng: drone.lng,
              distance: distanceEligibilty(drone, sendDroneLocation),
            });
          }
          if (
            distanceEligibilty(drone, sendDroneLocation) < nearestDrone.distance
          ) {
            setNearestDrone({
              lat: drone.lat,
              lng: drone.lng,
              distance: distanceEligibilty(drone, sendDroneLocation),
            });
          }
        }
      });
      // RETURNING NO DRONES FOUND OR DRONES COORDINATE IF FOUND
      if (nearestDrone.distance == "") {
        console.log("no drone found");
      } else {
        document
          .getElementById("Stage2")
          .classList.remove("activeDeliveryStep");
        document.getElementById("Stage3").classList.add("activeDeliveryStep");
        setNearbyDronesVisibilty(false);
      }
      fetch(process.env.REACT_APP_BACKEND_URL + "requestDrone", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: props.name,
          email: props.email,
          id: props.id,
          coordinates: sendDroneLocation,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data.message);
          }
        });
    }
  };

  // Function to close map on click
  const closeMapEvent = () => {
    document.getElementById("DeliveryMap").style.display = "none";
  };

  // Function to Add marker inside polygon on click

  function requestDropMarker(event) {
    // if (NearbyDronesVisibilty) {
    setSendDroneLocationLat(event.latLng.lat());
    setSendDroneLocationLng(event.latLng.lng());
    // } else {
    // alert("You cannot change postion in between the delivery process");
    // }
  }
  function requestDropMarkerOutside() {
    alert("HEy");
  }
  // Function to check is Drone inside 1 km or not
  function distanceEligibilty(mk1, mk2) {
    var R = 6371.071; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)
    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  }

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
          <div id="CloseMapBtn" onClick={closeMapEvent}>
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
            onLoad={onLoad}
            onClick={requestDropMarkerOutside}
            onUnmount={onUnmount}
            zoom={15}
            mapContainerStyle={{ width: "100vw", height: "100vh" }}
          >
            {/* User location marker */}
            {() => {
              if (1) {
                <Marker position={userLocationDetails}></Marker>;
              }
            }}
            {/* Send Drone marker */}
            <Marker position={sendDroneLocation} draggable={false}></Marker>
            <Polygon
              zIndex={1}
              onClick={requestDropMarker}
              paths={Drones}
              strokeColor={"#fff"}
              strokeOpacity={0.8}
              strokeWeight={0}
              fillColor={"#FF0000"}
              fillOpacity={0.35}
              draggable={false}
            />
            {/*Show Drones */}
            {Drones.map((drone, idx) => {
              if (distanceEligibilty(drone, sendDroneLocation) <= 1) {
                return (
                  <Marker
                    position={drone}
                    visible={NearbyDronesVisibilty}
                  ></Marker>
                );
              }
            })}
            {/* Show drone that has been assigned */}
            <Marker position={nearestDrone} draggable={false}></Marker>;
            {/* Polyline from desired location to drone */}
            <Polyline
              path={[nearestDrone, sendDroneLocation]}
              strokeColor={"#FF0000"}
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor={"#FF0000"}
              fillOpacity={0.35}
              clickable={false}
              draggable={false}
              editable={false}
              visible={!NearbyDronesVisibilty}
            />
          </GoogleMap>
          <div id="DeliveryStepsStatus">
            <ul>
              <li className="activeDeliveryStep" id="Stage1">
                <a href="">Requsting Stage</a>
              </li>
              <li id="Stage2">
                <a href="">Searching for nearest drone</a>
              </li>
              <li id="Stage3">
                <a href="">Drone Assigned</a>
              </li>
              <li id="Stage4">
                <a href="">Delivered</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddDelivery;
