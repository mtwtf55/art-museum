import React from "react";
// @ts-ignore
import svgLogo from "../../assets/favourites.svg";
import "./Favourites.scss";

function Favourites() {
  return (
    <>
      <img src={svgLogo} alt="Favourites logo" className={"logo"} />
    </>
  );
}

export default Favourites;
