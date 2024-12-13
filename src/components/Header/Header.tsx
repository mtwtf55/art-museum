import React from "react";
import "./Header.scss";
import LogoLight from "@components/Logo/LogoLight";
import Favourites from "@components/Links/Favourites";
import Container from "@components/Container/Container";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleFavouritesClicked() {
    navigate("/favourites");
  }

  function handleLogoClicked() {
    navigate("/");
  }

  return (
    <div className="header">
      <Container>
        <div className="header__inner">
          <div className="header__inner__logo">
            <LogoLight onClick={handleLogoClicked} />
          </div>
          {/*Some links that will be placed on the right side of header e.g. "Yor favorites", "Home", etc.*/}
          <div className="header__inner__links">
            <Favourites onClick={handleFavouritesClicked} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
