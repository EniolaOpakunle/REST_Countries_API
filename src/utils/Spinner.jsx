import React from "react";

function Spinner({ darkMode, currentMode }) {
  return (
    <div className={`spinnerDiv d-flex justify-content-center ${currentMode}`}>
      <div
        className={`spinner-border ${!darkMode ? "dark" : "light"}`}
        role="status"
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Spinner;
