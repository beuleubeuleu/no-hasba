import React from "react";
import "./Header.css"
import { Link } from "react-router-dom";

const Header = () => {

  return (
      <div className={ "navbar" }>
        <h1><Link className="navbar__title" to={"/"}>no hasba</Link></h1>
      </div>
  );
};

export default Header;
