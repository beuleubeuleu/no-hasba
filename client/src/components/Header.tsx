import React from "react";
import "./Header.css"

const Header = () => {

  let addTable = window.innerWidth > 450? "Add Trigroup": "+"

  return (
      <div className={ "navbar" }>
        <h1 className="navbar__title">No Hasba</h1>
        <button className="navbar__addTable">{ addTable }</button>
      </div>
  );
};

export default Header;
