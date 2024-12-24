import { ArtworkCardSmall } from "@Components";
import NotFoundPlaceholder from "@Components/Placeholders/NotFoundPlaceholder/NotFoundPlaceholder";
import SortMenu from "@Components/SortMenu/SortMenu";
import { Artwork } from "@Types/types";
import React from "react";

type SearchResultsType = {
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  iiifUrl: string;
};

const NO_RESULTS_MESSAGE = "Searching has no results";

function SearchResults({ artworks, iiifUrl, setArtworks }: SearchResultsType) {
  function createArtworkCard(a: Artwork) {
    return <ArtworkCardSmall artwork={a} key={a.id} iiifUrl={iiifUrl} />;
  }

  const artworkCards = artworks.map(createArtworkCard);

  return artworks.length === 0 ? (
    <NotFoundPlaceholder message={NO_RESULTS_MESSAGE} />
  ) : (
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
