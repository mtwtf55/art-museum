import React, { useState } from "react";
import "./ArtworkCardSmall.scss";
import { Artwork } from "../../../types/types";
// @ts-ignore
import addToFavouritesIcon from "../../../assets/add-to-favourites-icon.svg";
// @ts-ignore
import addToFavouritesIconHovered from "../../../assets/add-to-favourites-icon-hovered.svg";
import { useAppSelector } from "../../../withTypes";
import {
  selectIIIFUrl,
  selectRandomArtworksIIIFUrl,
} from "../../../store/selectors";
import {
  DEFAULT_IMG_PATH_PAYLOAD__MEDIUM_SIZE,
  DEFAULT_IMG_PATH_PAYLOAD__SMALL_SIZE,
} from "../../../utils/constants";

type ArtworkCardSmall = {
  artwork: Artwork;
};

function ArtworkCardSmall({
  artwork: { title, artist_title, is_public_domain, image_id },
}: ArtworkCardSmall) {
  const [hovered, setHovered] = useState(false);
  const iiifUrl = useAppSelector(selectRandomArtworksIIIFUrl);

  const imgUrl =
    iiifUrl + `/${image_id}` + DEFAULT_IMG_PATH_PAYLOAD__SMALL_SIZE;

  const icon = (
    <img
      src={addToFavouritesIcon}
      alt="Icon"
      onMouseEnter={() => setHovered(true)}
      style={{ cursor: "pointer" }}
    />
  );
  const iconHovered = (
    <img
      src={addToFavouritesIconHovered}
      alt="Icon hovered"
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    />
  );

  return (
    <div className={"artwork-card-small"}>
      <div className="artwork-card-small__image">
        <img src={imgUrl} alt="Image" />
      </div>
      <div className="artwork-card-small__content">
        <p className="artwork-card-small__content__title">{title}</p>
        <p className="artwork-card-small__content__artist">{artist_title}</p>
        <p className="artwork-card-small__content__is-public">
          {is_public_domain ? "Public" : "Copyright"}
        </p>
      </div>
      <div className="artwork-card-small__add-to-favourites">
        {hovered ? iconHovered : icon}
      </div>
    </div>
  );
}

export default ArtworkCardSmall;
