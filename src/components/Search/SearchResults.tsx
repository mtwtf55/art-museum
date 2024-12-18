import { ArtworkCardSmall } from "@Components";
import { Artwork } from "@Types/types";
import React from "react";

type SearchResultsType = {
  artworks: Artwork[];
  iiifUrl: string;
};

function SearchResults({ artworks, iiifUrl }: SearchResultsType) {
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
