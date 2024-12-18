import ArtworkCardSmall from "@components/OtherWorks/ArtworkCardSmall/ArtworkCardSmall";
import { Artwork } from "@src/types/types";
import React from "react";

type SearchResultsType = {
  artworks: Artwork[];
  iiifUrl: string;
};

function SearchResults({ artworks, iiifUrl }: SearchResultsType) {
  // const artworks = useAppSelector(selectSearchArtworks);
  // const iiifUrl = useAppSelector(selectSearchArtworksIIIFUrl);

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
