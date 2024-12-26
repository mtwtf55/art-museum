import "./SpecialGallery.scss";

import { Pagination } from "@Components/Pagination/Pagination";
import { ArtworkCard } from "@Components/SpecialGallery/ArtworkCard";
import { Artwork } from "@Types";
import { useMemo } from "react";

type SpecialGalleryProps = {
  artworks: Artwork[];
  iiifUrl: string;
  onNextPage: (page: number) => void;
  currentPage: number;
};

export function SpecialGallery({
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

  const galleryItems = useMemo(
    () => artworks.map(createArtworkCard),
    [artworks],
  );

  return (
    <div className="gallery">
      <span className="gallery__pretitle">Topics for you</span>
      <h2 className="gallery__title">Our special gallery</h2>
      <div className="gallery__main">{galleryItems}</div>
      <Pagination pagesCount={4} page={currentPage} setPage={handleNextPage} />
    </div>
  );
}
