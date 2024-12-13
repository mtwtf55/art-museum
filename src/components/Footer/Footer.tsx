import React from "react";
import "./Footer.scss";
import LogoDark from "@components/Logo/LogoDark";
import ModsenLogo from "@components/Logo/ModsenLogo";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  function handleClicked() {
    navigate("/");
  }

  return (
    <div className={"footer"}>
      <div className="footer__container">
        <div className="footer__inner">
          <div className="footer__inner__logo">
            <LogoDark onClick={handleClicked} />
          </div>
          <div className="footer__inner__logo">
            <ModsenLogo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
