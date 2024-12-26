import "./AddToFavouritesIcon.scss";

import icon from "@Assets/add-to-favourites-icon.svg";
import iconFilled from "@Assets/add-to-favourites-icon-filled.svg";
import iconFilledHovered from "@Assets/add-to-favourites-icon-filled-hovered.svg";
import iconHovered from "@Assets/add-to-favourites-icon-hovered.svg";
import React, { useState } from "react";

export function AddToFavouritesIcon({
  isFavourite,
  onClick: handleOnClick,
}: {
  isFavourite?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  function handleEnter() {
    setIsHovered(true);
  }

  function handleLeave() {
    setIsHovered(false);
  }

  const image = (
    <img
      src={icon}
      alt=""
      onMouseEnter={handleEnter}
      onClick={handleOnClick}
      data-testid="icon"
    />
  );

  const imageHovered = (
    <img
      src={iconHovered}
      alt=""
      onMouseLeave={handleLeave}
      onClick={handleOnClick}
      data-testid="icon-hovered"
    />
  );

  const imageFilled = (
    <img
      src={iconFilled}
      alt=""
      onMouseEnter={handleEnter}
      onClick={handleOnClick}
      data-testid="filled-icon"
    />
  );

  const imageFilledHovered = (
    <img
      src={iconFilledHovered}
      alt=""
      onMouseLeave={handleLeave}
      onClick={handleOnClick}
      data-testid="filled-icon-hovered"
    />
  );

  return (
    <div className={"add-to-favourites-icon"}>
      {isFavourite
        ? isHovered
          ? imageFilledHovered
          : imageFilled
        : isHovered
          ? imageHovered
          : image}
    </div>
  );
}
