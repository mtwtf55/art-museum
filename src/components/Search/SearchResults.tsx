import { ArtworkCardSmall } from "@Components";
import SortMenu from "@Components/SortMenu/SortMenu";
import { Artwork } from "@Types/types";
import React from "react";

type SearchResultsType = {
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  iiifUrl: string;
};

function SearchResults({ artworks, iiifUrl, setArtworks }: SearchResultsType) {
  function createArtworkCard(a: Artwork) {
    return <ArtworkCardSmall artwork={a} key={a.id} iiifUrl={iiifUrl} />;
  }

  const artworkCards = artworks.map(createArtworkCard);

  return (
    <div className="search-results">
      <div className="search-results__title">
        Results Of A Search
        <div className="sort-icon">
          <SortMenu data={artworks} setData={setArtworks} />
        </div>
      </div>
      <div className="search-results__main">{artworkCards}</div>
    </div>
  );
}

export default SearchResults;
