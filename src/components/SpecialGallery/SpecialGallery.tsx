import React, { useMemo, useState } from "react";
import Pagination from "../Pagination/Pagination";
import ArtworkCard from "./ArtworkCard";
import { ARTWORKS_AMOUNT_PER_ROW } from "../../utils/constants";
import "./SpecialGallery.scss";
import { Artwork } from "../../types/types";

type SpecialGalleryProps = {
  artworks: Artwork[];
};

function SpecialGallery({ artworks }: SpecialGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const artworksToShow = useMemo(() => {
    const ceilIndex = currentPage * ARTWORKS_AMOUNT_PER_ROW;
    const floorIndex =
      currentPage * ARTWORKS_AMOUNT_PER_ROW - ARTWORKS_AMOUNT_PER_ROW;
    return artworks.filter((_, k) => k >= floorIndex && k < ceilIndex);
  }, [currentPage, artworks]);

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
            id={aw.id}
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
