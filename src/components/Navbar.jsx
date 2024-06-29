import React from "react";

function Navbar() {
  return (
    <nav class="navbar navbar-light bg-light p-fixed">
      <div class="container-fluid div1">
        <a class="navbar-brand mb-0 h1">Where in the world?</a>
        <form class="d-flex">
          <button class="btn btn-outline-dark h1" type="submit">
            Dark Mode
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
