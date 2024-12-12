import React from "react";
// @ts-ignore
import svgLogo from "../../assets/favourites.svg";
import "./Favourites.scss";

function Favourites({ onClick: handleOnClick }: { onClick?: () => void }) {
  return (
    <>
      <img
        src={svgLogo}
        alt="Favourites logo"
        className={"logo"}
        onClick={handleOnClick}
      />
    </>
  );
}

export default Favourites;
