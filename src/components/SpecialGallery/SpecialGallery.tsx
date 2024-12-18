import "./SpecialGallery.scss";

import { Pagination } from "@Components";
import { Artwork } from "@Types/types";
import React from "react";

import ArtworkCard from "./ArtworkCard";

type SpecialGalleryProps = {
  artworks: Artwork[];
  iiifUrl: string;
  onNextPage: (page: number) => void;
  currentPage: number;
};

function SpecialGallery({
  artworks,
  iiifUrl,
  onNextPage: handleNextPage,
  currentPage,
}: SpecialGalleryProps) {
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

  const galleryItems = artworks.map(createArtworkCard);

  return (
    <div className="gallery">
      <p className="gallery__pretitle">Topics for you</p>
      <p className="gallery__title">Our special gallery</p>
      <div className="gallery__main">{galleryItems}</div>
      <Pagination pagesCount={4} page={currentPage} setPage={handleNextPage} />
    </div>
  );
}

export default SpecialGallery;
