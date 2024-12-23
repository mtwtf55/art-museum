import React, { useEffect, useState } from "react";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import "./DetailInfo.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@src/withTypes";
import {
  selectSelectedArtwork,
  selectSelectedArtworkIIIFUrl,
} from "@store/selectors";
import { fetchArtwork } from "@store/thunks";
import { DEFAULT_IMG_PATH_PAYLOAD__BIG_SIZE } from "@constants/constants";
import AddToFavouritesIcon from "@components/Buttons/AddToFavourites/AddToFavouritesIcon";
import Spinner from "@components/Spinner/Spinner";
import { selectedClear } from "@store/slices/artworksSlice";

function DetailInfo() {
  const dispatch = useAppDispatch();
  const selectedArtwork = useAppSelector(selectSelectedArtwork);
  const { artworkId } = useParams();
  const iiifUrl = useAppSelector(selectSelectedArtworkIIIFUrl);
  const [isArtworkInFavourites, setIsArtworkInFavourites] = useState(
    sessionStorage.getItem(selectedArtwork?.id.toString() ?? "") !== null,
  );
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchArtwork(artworkId ?? ""));

    return () => {
      dispatch(selectedClear());
    };
  }, []);

  const imgUrl =
    iiifUrl +
    `/${selectedArtwork?.image_id}` +
    DEFAULT_IMG_PATH_PAYLOAD__BIG_SIZE;

  function handleAddToFavourites(event: React.MouseEvent<HTMLElement>) {
    setIsArtworkInFavourites(!isArtworkInFavourites);
    event.stopPropagation();

    if (sessionStorage.getItem(selectedArtwork?.id.toString() ?? "") === null) {
      sessionStorage.setItem(
        selectedArtwork?.id.toString() ?? "",
        selectedArtwork?.title ?? "",
      );
    } else sessionStorage.removeItem(selectedArtwork?.id.toString() ?? "");
  }

  return (
    <div className={"detail-info-page"}>
      <Header />
      <div className="detail-info-page__main-wrapper">
        <div className="detail-info-page__main">
          <div className="detail-info-page__main__image">
            {isImageLoading && (
              <div className="spinner-wrapper">
                <Spinner />
              </div>
            )}
            <img src={imgUrl} alt="" onLoad={() => setIsImageLoading(false)} />
            <div className="detail-info-page__main__image__icon">
              <AddToFavouritesIcon
                onClick={handleAddToFavourites}
                isFavourite={
                  sessionStorage.getItem(
                    selectedArtwork?.id.toString() ?? "",
                  ) !== null
                }
              />
            </div>
          </div>
          <div className="detail-info-page__main__info">
            <div className="detail-info-page__main__info__general">
              <p className="detail-info-page__main__info__general__title">
                {selectedArtwork?.title}
              </p>
              <p className="detail-info-page__main__info__general__author">
                {selectedArtwork?.artist_title}
              </p>
              <p className="detail-info-page__main__info__general__createdAt">
                {selectedArtwork?.date_display}
              </p>
            </div>
            <div className="detail-info-page__main__info__overview">
              <p className="detail-info-page__main__info__overview__title">
                Overview
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Artist nationality: </span>
                {selectedArtwork?.place_of_origin}
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Dimensions: </span>
                {selectedArtwork?.dimensions}
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Credit Line: </span>
                {selectedArtwork?.credit_line}
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Repository: </span>
                {selectedArtwork?.gallery_title ?? "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailInfo;
