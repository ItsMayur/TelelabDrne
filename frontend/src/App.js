import React from "react";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeliveryHistory from "./pages/DeliveryHistory/DeliveryHistory";
import Map from "./pages/NewMap/Map";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/DeliveryHistory" element={<DeliveryHistory />}></Route>
        <Route path="/a" element={<Map />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
