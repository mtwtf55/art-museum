import React, { useState } from "react";
import "./ArtworkCardSmall.scss";
import { Artwork } from "../../../types/types";
import { DEFAULT_IMG_PATH_PAYLOAD__SMALL_SIZE } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import AddToFavouritesIcon from "../../Buttons/AddToFavourites/AddToFavouritesIcon";
import Spinner from "../../Spinner/Spinner";

type ArtworkCardSmall = {
  artwork: Artwork;
  iiifUrl: string;
};

function ArtworkCardSmall({
  artwork: { title, artist_title, is_public_domain, image_id, id: artworkId },
  iiifUrl,
}: ArtworkCardSmall) {
  const navigate = useNavigate();
  const [isArtworkInFavourites, setIsArtworkInFavourites] = useState(
    sessionStorage.getItem(artworkId.toString()) !== null,
  );
  const [isImageLoading, setIsImageLoading] = useState(true);

  const imgUrl =
    iiifUrl + `/${image_id}` + DEFAULT_IMG_PATH_PAYLOAD__SMALL_SIZE;

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
        {isImageLoading && (
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        )}
        <img src={imgUrl} alt="" onLoad={() => setIsImageLoading(false)} />
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
