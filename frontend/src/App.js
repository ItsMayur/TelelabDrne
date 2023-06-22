import React from "react";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeliveryHistory from "./pages/DeliveryHistory/DeliveryHistory";
import Map from "./pages/NewMap/Map";
import { useEffect } from "react";

const App = () => {
  const [userData, setUserData] = React.useState({
    name: "",
    id: "",
  });
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "userData", { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((a) => {
        setUserData(a);
        console.log(a);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar
              name={userData.name}
              email={userData.email}
              id={userData.id}
            />
          }
        ></Route>
        <Route
          path="/Dashboard"
          element={
            <Dashboard
              name={userData.name}
              email={userData.email}
              id={userData.id}
            />
          }
        ></Route>
        <Route
          path="/DeliveryHistory"
          element={
            <DeliveryHistory deliveryHistory={userData.deliveryHistory} />
          }
        ></Route>
        <Route path="/a" element={<Map />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
