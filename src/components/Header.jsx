import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className=" gapbelow navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <span>Hotelify:)</span>
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <Link className="nav-link" to="/">
              File Upload
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
