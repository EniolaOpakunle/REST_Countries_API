import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const handleChangeMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const currentMode = darkMode ? "dark" : "light";
  return (
    <div>
      <div>
        <nav class={`navbar navbar-light p-fixed shadow-sm ${currentMode}`}>
          <div class="container-fluid div1">
            <a class={`navbar-brand mb-0 h1 ${currentMode}`}>
              Where in the world?
            </a>
            <button className={currentMode} onClick={() => handleChangeMode()}>
              {!darkMode ? "Dark" : "Light"} Mode
            </button>
          </div>
        </nav>
      </div>
      <Outlet context={{ darkMode, handleChangeMode, currentMode }} />
    </div>
  );
}

export default RootLayout;
