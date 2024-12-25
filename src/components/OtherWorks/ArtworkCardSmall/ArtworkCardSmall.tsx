import "./ArtworkCardSmall.scss";

import { AddToFavouritesIcon } from "@Components/Buttons/AddToFavourites/AddToFavouritesIcon";
import { Image } from "@Components/Image/Image";
import { Artwork } from "@Types";
import { sessionStorageHelper } from "@Utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export type ArtworkCardSmallProps = {
  artwork: Artwork;
  iiifUrl: string;
};

export function ArtworkCardSmall({
  artwork: { title, artist_title, is_public_domain, image_id, id: artworkId },
  iiifUrl,
}: ArtworkCardSmallProps) {
  const navigate = useNavigate();
  const storageHelper = sessionStorageHelper();
  const [isArtworkInFavourites, setIsArtworkInFavourites] = useState(
    storageHelper.has(artworkId),
  );

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
    <div
      className={"artwork-card-small"}
      onClick={handleOnClick}
      data-testid="artwork-card-small"
    >
      <div className="artwork-card-small__image">
        <Image iiifUrl={iiifUrl} imageId={image_id} />
      </div>
      <div className="artwork-card-small__content">
        <h3 className="artwork-card-small__content__title">{title}</h3>
        <h4 className="artwork-card-small__content__artist">{artist_title}</h4>
        <p className="artwork-card-small__content__is-public">
          {is_public_domain ? "Public" : "Copyright"}
        </p>
      </div>
      <div className="artwork-card-small__add-to-favourites">
        <AddToFavouritesIcon
          onClick={handleAddToFavourites}
          isFavourite={isArtworkInFavourites}
        />
      </div>
    </div>
  );
}
