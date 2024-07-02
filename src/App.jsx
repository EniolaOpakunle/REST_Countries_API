import React from "react";
import Home from "./components/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import FullDetails from "./components/FullDetails";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/fulldetails/:name" element={<FullDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
