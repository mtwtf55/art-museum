import React, { useState } from "react";
import { useAppSelector } from "@src/withTypes";
import { selectIIIFUrl } from "@store/selectors";
import { DEFAULT_IMG_PATH_PAYLOAD__MEDIUM_SIZE } from "@constants/constants";
import "./SpecialGallery.scss";
import AddToFavouritesIcon from "@components/Buttons/AddToFavourites/AddToFavouritesIcon";
import { useNavigate } from "react-router-dom";

type ArtworkCardProps = {
  id: number;
  imageId: string;
  title: string;
  author: string;
  isPublic: boolean;
};

function ArtworkCard({
  imageId,
  title,
  author,
  isPublic,
  id: artworkId,
}: ArtworkCardProps) {
  const navigate = useNavigate();
  const iiifUrl = useAppSelector(selectIIIFUrl);
  const [isArtworkInFavourites, setIsArtworkInFavourites] = useState(
    sessionStorage.getItem(artworkId.toString()) !== null,
  );
  const imgUrl =
    iiifUrl + `/${imageId}` + DEFAULT_IMG_PATH_PAYLOAD__MEDIUM_SIZE;

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
    <div className="card">
      <div className="card__picture">
        <img src={imgUrl} alt="" />
      </div>
      <div className="card__info" onClick={handleOnClick}>
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
