import { Icon } from "@Components";
import pathNames from "@Constants/path-names";
import React from "react";
import { useNavigate } from "react-router-dom";

const FAVOURITES_LOGO_NAME = "favourites.svg";

function FavouritesLink() {
  const navigate = useNavigate();

  function handleFavouritesClicked() {
    navigate(pathNames.FAVOURITES);
  }

  return (
    <Icon onClick={handleFavouritesClicked} imgName={FAVOURITES_LOGO_NAME} />
  );
}

export default FavouritesLink;
