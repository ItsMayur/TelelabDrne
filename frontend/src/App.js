import React from "react";
import Navbar from "./components/Intro page/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import DeliveryHistory from "./pages/DeliveryHistory/DeliveryHistory";
import { useEffect } from "react";

const App = () => {
  // VARIABLE TO STORE USER DATA GOT FROM BACKEND
  const [userData, setUserData] = React.useState({
    Name: "",
    Organisation: "",
  });

  // GET REQUEST FOR USER DATA]
  useEffect(() => {
    let headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    fetch(process.env.REACT_APP_BACKEND_URL + "userData", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        console.log(data);
      });
  }, []);

  // FRONTEND HERE
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}></Route>
        <Route
          path="/Dashboard"
          element={
            <Dashboard
              Name={userData.Name}
              Organisation={userData.Organisation}
            />
          }
        ></Route>
        <Route
          path="/DeliveryHistory"
          element={
            <DeliveryHistory
              Name={userData.Name}
              Organisation={userData.Organisation}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
