import "./Footer.scss";

import { Icon } from "@Components";
import React from "react";

const MUSEUM_LOGO_NAME = "museum-logo-dark.svg";
const MODSEN_LOGO_NAME = "modsen-logo.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__inner">
          <div className="footer__inner__logo">
            <Icon imgName={MUSEUM_LOGO_NAME} isClickable={false} />
          </div>
          <div className="footer__inner__logo">
            <Icon imgName={MODSEN_LOGO_NAME} isClickable={false} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
