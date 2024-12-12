import React from "react";
// @ts-ignore
import logo from "../../assets/museum-logo-light.svg";

function LogoLight({ onClick: handleClicked }: { onClick?: () => void }) {
  return (
    <>
      <img
        src={logo}
        alt="Logo-light"
        onClick={handleClicked}
        style={{ cursor: "pointer" }}
      />
    </>
  );
}

export default LogoLight;
