import React from "react";

function Spinner({ darkMode, currentMode }) {
  return (
    <div className={`spinnerDiv d-flex justify-content-center ${currentMode}`}>
      <div
        class={`spinner-border ${!darkMode ? "dark" : "light"}`}
        role="status"
      >
        <span class="sr-only"></span>
      </div>
    </div>
  );
}

export default Spinner;
