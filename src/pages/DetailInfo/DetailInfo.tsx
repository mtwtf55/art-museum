import "./DetailInfo.scss";

import {
  AddToFavouritesIcon,
  Footer,
  Header,
  Image,
  LoadingPlaceholder,
} from "@Components";
import { DEFAULT_IIIF_URL, REQUESTED_FIELDS } from "@Constants";
import { ArtworkResponseType } from "@Types";
import { createRequestUrl, sessionStorageHelper, useQuery } from "@Utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function DetailInfo() {
  const { artworkId } = useParams();
  const storageHelper = sessionStorageHelper();

  const {
    query: getArtwork,
    data: artwork,
    loading: artworkLoading,
  } = useQuery<ArtworkResponseType>({
    url: createRequestUrl()
      .artwork(Number(artworkId))
      .fields(REQUESTED_FIELDS)
      .build(),
  });

  const [isArtworkInFavourites, setIsArtworkInFavourites] = useState(
    storageHelper.has(artwork?.data.id),
  );

  useEffect(() => {
    getArtwork();
  }, []);

  function handleAddToFavourites(event: React.MouseEvent<HTMLElement>) {
    setIsArtworkInFavourites(!isArtworkInFavourites);
    event.stopPropagation();

    if (!storageHelper.has(artwork?.data.id)) {
      storageHelper.add(artwork?.data.id, artwork?.data.title ?? "");
    } else storageHelper.remove(artwork?.data.id);
  }

  const isFavourite = storageHelper.has(artwork?.data.id);

  return (
    <div className={"detail-info-page"}>
      <Header />
      {artworkLoading ? (
        <LoadingPlaceholder />
      ) : (
        <div className="detail-info-page__main-wrapper">
          <div className="detail-info-page__main">
            <div className="detail-info-page__main__image">
              <Image
                iiifUrl={artwork?.config.iiif_url || DEFAULT_IIIF_URL}
                imageId={artwork?.data.image_id}
              />
              <div className="detail-info-page__main__image__icon">
                <AddToFavouritesIcon
                  onClick={handleAddToFavourites}
                  isFavourite={isFavourite}
                />
              </div>
            </div>
            <div className="detail-info-page__main__info">
              <div className="detail-info-page__main__info__general">
                <h3 className="detail-info-page__main__info__general__title">
                  {artwork?.data?.title}
                </h3>
                <p className="detail-info-page__main__info__general__author">
                  {artwork?.data?.artist_title}
                </p>
                <p className="detail-info-page__main__info__general__createdAt">
                  {artwork?.data?.date_display}
                </p>
              </div>
              <div className="detail-info-page__main__info__overview">
                <h2 className="detail-info-page__main__info__overview__title">
                  Overview
                </h2>
                <p className="detail-info-page__main__info__overview__item">
                  <span className="overview-category">
                    Artist nationality:{" "}
                  </span>
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
      )}
      <Footer />
    </div>
  );
}
