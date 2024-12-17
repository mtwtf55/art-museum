import React from "react";
import {
  selectSearchArtworks,
  selectSearchArtworksIIIFUrl,
} from "@store/selectors";
import ArtworkCardSmall from "@components/OtherWorks/ArtworkCardSmall/ArtworkCardSmall";
import { useAppSelector } from "@src/withTypes";
import { Artwork } from "@src/types/types";

function SearchResults() {
  const artworks = useAppSelector(selectSearchArtworks);
  const iiifUrl = useAppSelector(selectSearchArtworksIIIFUrl);

  function createArtworkCard(a: Artwork) {
    return <ArtworkCardSmall artwork={a} key={a.id} iiifUrl={iiifUrl} />;
  }

  const artworkCards = artworks.map(createArtworkCard);

  return (
    <div className="search-results">
      <p className="search-results__title">Results Of A Search</p>
      <div className="search-results__main">{artworkCards}</div>
    </div>
  );
}

export default SearchResults;
