import React, { useState } from "react";
import "./AddToFavouritesIcon.scss";
import icon from "@assets/add-to-favourites-icon.svg";
import iconHovered from "@assets/add-to-favourites-icon-hovered.svg";
import iconFilled from "@assets/add-to-favourites-icon-filled.svg";
import iconFilledHovered from "@assets/add-to-favourites-icon-filled-hovered.svg";

function AddToFavouritesIcon({
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
    <img src={icon} alt="" onMouseEnter={handleEnter} onClick={handleOnClick} />
  );
  const imageHovered = (
    <img
      src={iconHovered}
      alt=""
      onMouseLeave={handleLeave}
      onClick={handleOnClick}
    />
  );
  const imageFilled = (
    <img
      src={iconFilled}
      alt=""
      onMouseEnter={handleEnter}
      onClick={handleOnClick}
    />
  );
  const imageFilledHovered = (
    <img
      src={iconFilledHovered}
      alt=""
      onMouseLeave={handleLeave}
      onClick={handleOnClick}
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

export default AddToFavouritesIcon;
