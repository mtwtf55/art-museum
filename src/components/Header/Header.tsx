import "./Header.scss";

import { BurgerMenu } from "@Components/BurgerMenu/BurgerMenu";
import { FavouritesLink } from "@Components/Header/Links/FavouritesLink";
import { HomeLink } from "@Components/Header/Links/HomeLink";
import { Icon } from "@Components/Icon/Icon";
import { useWindowDimensions } from "@Utils";

const MUSEUM_LOGO_NAME = "museum-logo-light.svg";
const WINDOW_WIDTH_LIMIT = 700;

export function Header() {
  const { width: windowWidth } = useWindowDimensions();

  const MainMenu = (
    <ul className="header__inner__links" data-testid="main-menu">
      <HomeLink />
      <FavouritesLink />
    </ul>
  );

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__inner">
          <div className="header__inner__logo">
            <Icon imgName={MUSEUM_LOGO_NAME} isClickable={false} />
          </div>
          {windowWidth < WINDOW_WIDTH_LIMIT ? <BurgerMenu /> : MainMenu}
        </div>
      </div>
    </header>
  );
}
