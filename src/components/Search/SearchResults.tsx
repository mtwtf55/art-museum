import React from "react";
import { useSelector } from "react-redux";
import {
  selectSearchArtworks,
  selectSearchArtworksIIIFUrl,
} from "../../store/selectors";
import ArtworkCardSmall from "../OtherWorks/ArtworkCardSmall/ArtworkCardSmall";
import { useAppSelector } from "../../withTypes";

function SearchResults() {
  const artworks = useAppSelector(selectSearchArtworks);
  const iiifUrl = useAppSelector(selectSearchArtworksIIIFUrl);

  return (
    <div className="search-results">
      <p className="search-results__title">Results Of A Search</p>
      <div className="search-results__main">
        {artworks.map((a) => (
          <ArtworkCardSmall artwork={a} key={a.id} iiifUrl={iiifUrl} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
