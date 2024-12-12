import React, { useEffect } from "react";
import { Artwork } from "../../types/types";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./DetailInfo.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../withTypes";
import {
  selectSelectedArtwork,
  selectSelectedArtworkIIIFUrl,
} from "../../store/selectors";
import { fetchArtwork } from "../../store/thunks";
import {
  DEFAULT_IMG_PATH_PAYLOAD__BIG_SIZE,
  DEFAULT_IMG_PATH_PAYLOAD__SMALL_SIZE,
} from "../../utils/constants";
import AddToFavouritesIcon from "../../components/Buttons/AddToFavourites/AddToFavouritesIcon";

function DetailInfo() {
  const dispatch = useAppDispatch();
  const selectedArtwork = useAppSelector(selectSelectedArtwork);
  const { artworkId } = useParams();
  const iiifUrl = useAppSelector(selectSelectedArtworkIIIFUrl);

  useEffect(() => {
    dispatch(fetchArtwork(artworkId ?? ""));
  }, []);

  const imgUrl =
    iiifUrl +
    `/${selectedArtwork?.image_id}` +
    DEFAULT_IMG_PATH_PAYLOAD__BIG_SIZE;

  console.log({ selectedArtwork });

  return (
    <div className={"detail-info-page"}>
      <Header />
      <div className="detail-info-page__main-wrapper">
        <div className="detail-info-page__main">
          <div className="detail-info-page__main__image">
            <img src={imgUrl} alt="" />
            <div className="detail-info-page__main__image__icon">
              <AddToFavouritesIcon />
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
                <span className="overview-category">Artist nacionality:</span>
                {selectedArtwork?.place_of_origin}
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Dimensions:</span>
                {selectedArtwork?.dimensions}
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Credit Line:</span>
                {selectedArtwork?.credit_line}
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Repository:</span>
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
