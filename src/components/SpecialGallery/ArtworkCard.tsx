import "./SpecialGallery.scss";

import { AddToFavouritesIcon } from "@Components";
import { DEFAULT_IMG_PATH_PAYLOAD__MEDIUM_SIZE } from "@Constants/constants";
import { sessionStorageHelper } from "@Utils/functions/sessionStorageHelper";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type ArtworkCardProps = {
  id: number;
  imageId: string;
  title: string;
  author: string;
  isPublic: boolean;
  iiifUrl: string;
};

function ArtworkCard({
  imageId,
  title,
  author,
  isPublic,
  id: artworkId,
  iiifUrl,
}: ArtworkCardProps) {
  const navigate = useNavigate();
  const storageHelper = sessionStorageHelper();
  const [isArtworkInFavourites, setIsArtworkInFavourites] = useState(
    storageHelper.has(artworkId),
  );
  const imgUrl =
    iiifUrl + `/${imageId}` + DEFAULT_IMG_PATH_PAYLOAD__MEDIUM_SIZE;

  function handleOnClick() {
    navigate(`/artworks/${artworkId}`);
  }

  function handleAddToFavourites(event: React.MouseEvent<HTMLElement>) {
    setIsArtworkInFavourites(!isArtworkInFavourites);
    event.stopPropagation();

    if (!storageHelper.has(artworkId)) storageHelper.add(artworkId, title);
    else storageHelper.remove(artworkId);
  }

  return (
    <div className="card" onClick={handleOnClick}>
      <div className="card__picture">
        <img src={imgUrl} alt="" />
      </div>
      <div className="card__info">
        <div className="card__info__wrapper">
          <div className="card__info__description">
            <p className="card__info__description__title">{title}</p>
            <p className="card__info__description__author">{author}</p>
          </div>
          <p className="card__info__isPublic">
            {isPublic ? "Public" : "Copyright"}
          </p>
        </div>
        <AddToFavouritesIcon
          onClick={handleAddToFavourites}
          isFavourite={isArtworkInFavourites}
        />
      </div>
    </div>
  );
}

export default ArtworkCard;
