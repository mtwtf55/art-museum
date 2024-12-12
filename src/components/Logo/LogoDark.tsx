import React from "react";
// @ts-ignore
import logo from "../../assets/museum-logo-dark.svg";

function LogoDark({ onClick: handleClicked }: { onClick?: () => void }) {
  return (
    <>
      <img
        src={logo}
        alt="Logo-dark"
        style={{ cursor: "pointer" }}
        onClick={handleClicked}
      />
    </>
  );
}

export default LogoDark;
