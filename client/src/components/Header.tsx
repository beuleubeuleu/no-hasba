import React, { useEffect, useState } from "react";
import "./Header.css"

const Header = () => {
  const [width, setWidth] =useState<number>(0)

  const updateWidth = () => {
    const width = window.innerWidth
    setWidth(width)
  }

  useEffect(() => {
    return () => {
      updateWidth()
      window.addEventListener("resize", updateWidth)
    };
  }, []);


  let addTable = width > 450? "Add Trigroup": "+"

  return (
      <div className={ "navbar" }>
        <h1 className="navbar__title">No Hasba</h1>
        <button className="navbar__addTable">{ addTable }</button>
      </div>
  );
};

export default Header;
