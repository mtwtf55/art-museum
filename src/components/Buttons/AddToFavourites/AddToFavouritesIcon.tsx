import React, { MouseEventHandler, useState } from "react";
import "./AddToFavouritesIcon.scss";
// @ts-ignore
import icon from "@assets/add-to-favourites-icon.svg";
// @ts-ignore
import iconHovered from "@assets/add-to-favourites-icon-hovered.svg";
// @ts-ignore
import iconFilled from "@assets/add-to-favourites-icon-filled.svg";
// @ts-ignore
import iconFilledHovered from "@assets/add-to-favourites-icon-filled-hovered.svg";

function AddToFavouritesIcon({
  isFavourite,
  onClick: handleOnClick,
}: {
  isFavourite?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const image = (
    <img
      src={icon}
      alt=""
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleOnClick}
    />
  );
  const imageHovered = (
    <img
      src={iconHovered}
      alt=""
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOnClick}
    />
  );
  const imageFilled = (
    <img
      src={iconFilled}
      alt=""
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleOnClick}
    />
  );
  const imageFilledHovered = (
    <img
      src={iconFilledHovered}
      alt=""
      onMouseLeave={() => setIsHovered(false)}
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
