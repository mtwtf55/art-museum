import React, { useState } from "react";
// @ts-ignore
import cardPicture from "../../assets/picture-big.png";
// @ts-ignore
import addToFavouritesIcon from "../../assets/add-to-favourites-icon.svg";
import { useAppSelector } from "../../withTypes";
import { selectIIIFUrl } from "../../store/selectors";
import { DEFAULT_IMG_PATH_PAYLOAD__MEDIUM_SIZE } from "../../utils/constants";
import "./SpecialGallery.scss";
import ImagePlaceholder from "./ImagePlaceholder";

type ArtworkCardProps = {
  imageId: string;
  title: string;
  author: string;
  isPublic: boolean;
};

function ArtworkCard({ imageId, title, author, isPublic }: ArtworkCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const iiifUrl = useAppSelector(selectIIIFUrl);
  const imgUrl =
    iiifUrl + `/${imageId}` + DEFAULT_IMG_PATH_PAYLOAD__MEDIUM_SIZE;

  const image = console.log(isImageLoaded);

  return (
    <div className="card">
      <div className="card__picture">
        <img src={imgUrl} alt="Card picture" />;
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
        <img
          className={"card__info__icon"}
          src={addToFavouritesIcon}
          alt={"Add favourite icon"}
        />
      </div>
    </div>
  );
}

export default ArtworkCard;
