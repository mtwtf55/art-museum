import "./BurgerMenu.scss";

import { Icon } from "@Components";
import FavouritesLink from "@Components/Header/Links/FavouritesLink";
import HomeLink from "@Components/Header/Links/HomeLink";
import React, { useState } from "react";

const BURGER_MENU_ICON_NAME = "burger-menu-icon.svg";

function BurgerMenu() {
  const [isActive, setIsActive] = useState(false);

  function handleBurgerMenuClicked() {
    setIsActive(!isActive);
  }

  return (
    <div className="burger-menu">
      <div className="burger-menu__icon">
        <Icon
          imgName={BURGER_MENU_ICON_NAME}
          isClickable={true}
          onClick={handleBurgerMenuClicked}
        />
      </div>
      <ul className={`burger-menu__links${isActive ? " active" : ""}`}>
        <li className="burger-menu__links__container">
          <HomeLink />
        </li>
        <li className="burger-menu__links__container">
          <FavouritesLink />
        </li>
      </ul>
    </div>
  );
}

export default BurgerMenu;
