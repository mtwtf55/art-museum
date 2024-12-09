import React from "react";
import "./Header.scss";
import LogoLight from "../Logo/LogoLight";
import Favourites from "../Links/Favourites";

export type HeaderProps = {
  links?: React.ReactNode[] | undefined
}

function Header({ links }: HeaderProps) {

  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__inner__logo">
          <LogoLight />
        </div>
        {/*Some links that will be placed on the right side of header e.g. "Yor favorites", "Home", etc.*/}
        <div className="header__inner__links">
          <Favourites/>
        </div>
      </div>
    </div>
  );
}

export default Header;