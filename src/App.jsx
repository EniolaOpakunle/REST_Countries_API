import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { lazy } from "react";
const Home = lazy(() => import("./components/Home"));
const FullDetails = lazy(() => import("./components/FullDetails"));

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback="loading...">
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/fulldetails/:name"
          element={
            <Suspense fallback="loading...">
              <FullDetails />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
