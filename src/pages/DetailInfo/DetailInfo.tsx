import "./DetailInfo.scss";

import { AddToFavouritesIcon, Footer, Header, Spinner } from "@Components";
import {
  DEFAULT_IMG_PATH_PAYLOAD__BIG_SIZE,
  REQUESTED_FIELDS,
} from "@Constants/constants";
import { ArtworkResponseType } from "@Types/types";
import { createRequestUrl } from "@Utils/functions/createRequestUrl";
import { sessionStorageHelper } from "@Utils/functions/sessionStorageHelper";
import { useQuery } from "@Utils/hooks/useQuery";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

function DetailInfo() {
  const { artworkId } = useParams();
  const storageHelper = sessionStorageHelper();
  const { query: getArtwork, data: artwork } = useQuery<ArtworkResponseType>({
    url: createRequestUrl()
      .artwork(Number(artworkId))
      .fields(REQUESTED_FIELDS)
      .build(),
  });
  const [isArtworkInFavourites, setIsArtworkInFavourites] = useState(
    storageHelper.has(artwork?.data.id),
  );
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    getArtwork();
  }, []);

  const imgUrl = useMemo(
    () =>
      artwork?.config.iiif_url +
      `/${artwork?.data?.image_id}` +
      DEFAULT_IMG_PATH_PAYLOAD__BIG_SIZE,
    [artwork],
  );

  function handleAddToFavourites(event: React.MouseEvent<HTMLElement>) {
    setIsArtworkInFavourites(!isArtworkInFavourites);
    event.stopPropagation();

    if (!storageHelper.has(artwork?.data.id)) {
      storageHelper.add(artwork?.data.id, artwork?.data.title ?? "");
    } else storageHelper.remove(artwork?.data.id);
  }

  const isFavourite = storageHelper.has(artwork?.data.id);

  function handleImageLoads() {
    setIsImageLoading(false);
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
            <img src={imgUrl} alt="" onLoad={handleImageLoads} />
            <div className="detail-info-page__main__image__icon">
              <AddToFavouritesIcon
                onClick={handleAddToFavourites}
                isFavourite={isFavourite}
              />
            </div>
          </div>
          <div className="detail-info-page__main__info">
            <div className="detail-info-page__main__info__general">
              <p className="detail-info-page__main__info__general__title">
                {artwork?.data?.title}
              </p>
              <p className="detail-info-page__main__info__general__author">
                {artwork?.data?.artist_title}
              </p>
              <p className="detail-info-page__main__info__general__createdAt">
                {artwork?.data?.date_display}
              </p>
            </div>
            <div className="detail-info-page__main__info__overview">
              <p className="detail-info-page__main__info__overview__title">
                Overview
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Artist nationality: </span>
                {artwork?.data?.place_of_origin}
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Dimensions: </span>
                {artwork?.data?.dimensions}
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Credit Line: </span>
                {artwork?.data?.credit_line}
              </p>
              <p className="detail-info-page__main__info__overview__item">
                <span className="overview-category">Repository: </span>
                {artwork?.data?.gallery_title ?? "Unknown"}
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
