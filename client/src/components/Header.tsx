import React from "react";
import "./Header.css"

const Header = () => {
  return (
      <div className={"navbar"}>
        <h1 className="navbar__title">No Hasba</h1>
        <button className="navbar__addTable">+</button>
      </div>
  );
};

export default Header;
