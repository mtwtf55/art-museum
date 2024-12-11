import React from "react";
import "./Footer.scss";
import Container from "../Container/Container";
import LogoDark from "../Logo/LogoDark";
import ModsenLogo from "../Logo/ModsenLogo";

function Footer() {
  return (
    <div className={"footer"}>
      <Container>
        <div className="footer__inner">
          <div className="footer__inner__logo">
            <LogoDark />
          </div>
          <div className="footer__inner__logo">
            <ModsenLogo />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
