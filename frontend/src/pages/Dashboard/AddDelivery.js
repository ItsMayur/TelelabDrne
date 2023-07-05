import { React, useState, useCallback, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polyline,
  Polygon,
} from "@react-google-maps/api";
import "./dashboard.css";

// DUMMY DRONES
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

// LOAD MAP FROM API
const AddDelivery = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // VARIABLES USED IN CODE
  const [nearestDrone, setNearestDrone] = useState({
    lat: undefined,
    lng: undefined,
    distance: undefined,
  });

  const [NearbyDronesVisibilty, setNearbyDronesVisibilty] = useState(false);
  const [sendDroneLocationLat, setSendDroneLocationLat] = useState(NaN);
  const [sendDroneLocationLng, setSendDroneLocationLng] = useState(NaN);
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(NaN);
  const [lng, setLng] = useState(NaN);

  const userLocationDetails = {
    lat: lat,
    lng: lng,
  };
  const sendDroneLocation = {
    lat: sendDroneLocationLat,
    lng: sendDroneLocationLng,
  };

  const [stageState, setStageState] = useState("Requesting");

  // FUNCTIONS USED IN CODE
  // MAP
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // DISPLAY MAP
  const displayMap = () => {
    if (navigator.geolocation) {
      document.getElementById("DeliveryMap").style.display = "Flex";
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  };

  // CLOSE MAP FUNCTION
  const closeMapEvent = () => {
    document.getElementById("DeliveryMap").style.display = "none";
  };

  // REQUEST DROP FETCH REQUEST
  const requestDrop = () => {
    {
      fetch(process.env.REACT_APP_BACKEND_URL + "requestDrone", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: sendDroneLocation,
        }),
      });

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
    }
  };

  // ADD MARKER INSIDE POLIGON
  function requestDropMarker(event) {
    setSendDroneLocationLat(event.latLng.lat());
    setSendDroneLocationLng(event.latLng.lng());
  }
  // REQUEST DRONE OUTSIDE THE POLIGON
  function requestDropMarkerOutside() {
    console.log("Sorry we don't work at that location now");
  }
  // CHECK DISTANCE BETWEEN 2 MARKER
  function distanceEligibilty(mk1, mk2) {
    var R = 6371.071; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)
    var distance =
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
    return distance;
  }

  // TO LOAD MAP API
  if (!isLoaded) {
    return <div>Loading.. Please Wait</div>;
  }
  //FRONTEND HERE
  return (
    <div className="dashCard">
      <h1>{props.heading}</h1>

      {/* REQUEST DROP BUTTON */}
      <button onClick={displayMap}>Request Drop</button>
      <div className="MapBox">
        <div id="DeliveryMap">
          {/* CLOSE MAP BUTTON */}
          <div id="CloseMapBtn" onClick={closeMapEvent}>
            Close map
          </div>

          {/* MAP BUTTONS */}
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
            {/* USER LOCATION MARKER */}
            {() => {
              if ((sendDroneLocation = "")) {
                <Marker position={userLocationDetails}></Marker>;
              }
            }}
            {/* SELECTED LOCATION MARKER*/}
            <Marker position={sendDroneLocation} draggable={false}></Marker>
            {/* POLYGON FOR SERVICE AREA */}
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
            {/* SHOW DRONES */}
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
            {/* SHOW ASSIGNED DRONE */}
            <Marker position={nearestDrone} draggable={false}></Marker>;
            {/* LINE TO LOCATION AND DRONE */}
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

          {/* DELIVERY STEPS */}
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
