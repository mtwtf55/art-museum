import React, { useState } from "react";
import "./ArtworkCardSmall.scss";
import { Artwork } from "../../../types/types";
import { useAppSelector } from "../../../withTypes";
import {
  selectFavouriteArtworksIIIFUrl,
  selectRandomArtworksIIIFUrl,
} from "../../../store/selectors";
import { DEFAULT_IMG_PATH_PAYLOAD__SMALL_SIZE } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import AddToFavouritesIcon from "../../Buttons/AddToFavourites/AddToFavouritesIcon";

type ArtworkCardSmall = {
  artwork: Artwork;
};

function ArtworkCardSmall({
  artwork: { title, artist_title, is_public_domain, image_id, id: artworkId },
}: ArtworkCardSmall) {
  const randomArtworksIIIFUrl = useAppSelector(selectRandomArtworksIIIFUrl);
  const favouriteArtworksIIIFUrl = useAppSelector(
    selectFavouriteArtworksIIIFUrl,
  );
  const navigate = useNavigate();
  const [isArtworkInFavourites, setIsArtworkInFavourites] = useState(
    sessionStorage.getItem(artworkId.toString()) !== null,
  );

  const imgUrl =
    (randomArtworksIIIFUrl || favouriteArtworksIIIFUrl) +
    `/${image_id}` +
    DEFAULT_IMG_PATH_PAYLOAD__SMALL_SIZE;

  function handleOnClick() {
    navigate(`/artworks/${artworkId}`);
  }

  function handleAddToFavourites(event: React.MouseEvent<HTMLElement>) {
    setIsArtworkInFavourites(!isArtworkInFavourites);
    event.stopPropagation();

    if (sessionStorage.getItem(artworkId.toString()) === null) {
      sessionStorage.setItem(artworkId.toString(), title);
    } else sessionStorage.removeItem(artworkId.toString());
  }

  return (
    <div className={"artwork-card-small"} onClick={handleOnClick}>
      <div className="artwork-card-small__image">
        <img src={imgUrl} alt="" />
      </div>
      <div className="artwork-card-small__content">
        <p className="artwork-card-small__content__title">{title}</p>
        <p className="artwork-card-small__content__artist">{artist_title}</p>
        <p className="artwork-card-small__content__is-public">
          {is_public_domain ? "Public" : "Copyright"}
        </p>
      </div>
      <div className="artwork-card-small__add-to-favourites">
        {/*{hovered ? iconHovered : icon}*/}
        <AddToFavouritesIcon
          onClick={handleAddToFavourites}
          isFavourite={isArtworkInFavourites}
        />
      </div>
    </div>
  );
}

export default ArtworkCardSmall;
