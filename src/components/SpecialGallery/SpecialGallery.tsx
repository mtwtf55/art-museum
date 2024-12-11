import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../withTypes";
import { selectArtworks } from "../../store/selectors";
import { fetchArtworks } from "../../store/thunks";
import ArtworkCard from "./ArtworkCard";
import { ARTWORKS_AMOUNT_PER_ROW } from "../../utils/constants";
import "./SpecialGallery.scss";

function SpecialGallery() {
  const dispatch = useAppDispatch();
  const artworks = useAppSelector(selectArtworks);
  const [currentPage, setCurrentPage] = useState(1);

  const artworksToShow = useMemo(() => {
    const ceilIndex = currentPage * ARTWORKS_AMOUNT_PER_ROW;
    const floorIndex =
      currentPage * ARTWORKS_AMOUNT_PER_ROW - ARTWORKS_AMOUNT_PER_ROW;
    return artworks.filter((_, k) => k >= floorIndex && k < ceilIndex);
  }, [currentPage, artworks]);

  useEffect(() => {
    dispatch(fetchArtworks());
  }, []);

  return (
    <div className="gallery">
      <p className="gallery__pretitle">Topics for you</p>
      <p className="gallery__title">Our special gallery</p>
      <div className="gallery__main">
        {artworksToShow.map((aw) => (
          <ArtworkCard
            imageId={aw.image_id}
            title={aw.title}
            author={aw.artist_title}
            isPublic={aw.is_public_domain}
            key={aw.id}
          />
        ))}
      </div>

      {/*  Pagination*/}
      <Pagination pagesCount={4} page={currentPage} setPage={setCurrentPage} />
    </div>
  );
}

export default SpecialGallery;
