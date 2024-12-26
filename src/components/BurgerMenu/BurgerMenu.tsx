import "./BurgerMenu.scss";

import { FavouritesLink } from "@Components/Header/Links/FavouritesLink";
import { HomeLink } from "@Components/Header/Links/HomeLink";
import { Icon } from "@Components/Icon/Icon";
import { useState } from "react";

const BURGER_MENU_ICON_NAME = "burger-menu-icon.svg";

export function BurgerMenu() {
  const [isActive, setIsActive] = useState(false);

  function handleBurgerMenuClicked() {
    setIsActive(!isActive);
  }

  return (
    <div className="burger-menu" data-testid="burger-menu">
      <div className="burger-menu__icon">
        <Icon
          imgName={BURGER_MENU_ICON_NAME}
          isClickable={true}
          onClick={handleBurgerMenuClicked}
        />
      </div>
      <ul
        className={`burger-menu__links${isActive ? " active" : ""}`}
        data-testid="links-container"
      >
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
