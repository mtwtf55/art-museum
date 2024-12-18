import "./SpecialGallery.scss";

import Pagination from "@components/Pagination/Pagination";
import { ARTWORKS_AMOUNT_PER_ROW } from "@constants/constants";
import { Artwork } from "@src/types/types";
import React, { useMemo, useState } from "react";

import ArtworkCard from "./ArtworkCard";

type SpecialGalleryProps = {
  artworks: Artwork[];
  iiifUrl: string;
};

function SpecialGallery({ artworks, iiifUrl }: SpecialGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const artworksToShow = useMemo(() => {
    const ceilIndex = currentPage * ARTWORKS_AMOUNT_PER_ROW;
    const floorIndex =
      currentPage * ARTWORKS_AMOUNT_PER_ROW - ARTWORKS_AMOUNT_PER_ROW;
    return artworks.filter((_, k) => k >= floorIndex && k < ceilIndex);
  }, [currentPage, artworks]);

  function createArtworkCard(aw: Artwork) {
    return (
      <ArtworkCard
        imageId={aw.image_id}
        title={aw.title}
        author={aw.artist_title}
        isPublic={aw.is_public_domain}
        id={aw.id}
        key={aw.id}
        iiifUrl={iiifUrl}
      />
    );
  }

  const galleryItems = artworksToShow.map(createArtworkCard);

  return (
    <div className="gallery">
      <p className="gallery__pretitle">Topics for you</p>
      <p className="gallery__title">Our special gallery</p>
      <div className="gallery__main">{galleryItems}</div>
      <Pagination pagesCount={4} page={currentPage} setPage={setCurrentPage} />
    </div>
  );
}

export default SpecialGallery;
