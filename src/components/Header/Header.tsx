import "./Header.scss";

import Icon from "@components/Icon/Icon";
import pathNames from "@constants/path-names";
import React from "react";
import { useNavigate } from "react-router-dom";

const MUSEUM_LOGO_NAME = "museum-logo-light.svg";
const HOME_LOGO_NAME = "home.svg";
const FAVOURITES_LOGO_NAME = "favourites.svg";

function Header() {
  const navigate = useNavigate();

  function handleFavouritesClicked() {
    navigate(pathNames.FAVOURITES);
  }

  function handleHomeClicked() {
    navigate(pathNames.HOME);
  }

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__inner">
          <div className="header__inner__logo">
            <Icon imgName={MUSEUM_LOGO_NAME} isClickable={false} />
          </div>
          {/*Some links that will be placed on the right side of header e.g. "Yor favorites", "Home", etc.*/}
          <div className="header__inner__links">
            <Icon onClick={handleHomeClicked} imgName={HOME_LOGO_NAME} />
            <Icon
              onClick={handleFavouritesClicked}
              imgName={FAVOURITES_LOGO_NAME}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
