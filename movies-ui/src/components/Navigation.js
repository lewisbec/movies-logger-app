import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
      </nav>
    </div>
  );
}

export default Navigation;
