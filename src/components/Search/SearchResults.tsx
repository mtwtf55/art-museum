import "./Search.scss";

import { ArtworkCardSmall } from "@Components/OtherWorks/ArtworkCardSmall/ArtworkCardSmall";
import { NotFoundPlaceholder } from "@Components/Placeholders/NotFoundPlaceholder/NotFoundPlaceholder";
import { SortMenu } from "@Components/SortMenu/SortMenu";
import { Artwork } from "@Types";

type SearchResultsType = {
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  iiifUrl: string;
};

const NO_RESULTS_MESSAGE = "Searching has no results";

export function SearchResults({
  artworks,
  iiifUrl,
  setArtworks,
}: SearchResultsType) {
  function createArtworkCard(a: Artwork) {
    return <ArtworkCardSmall artwork={a} key={a.id} iiifUrl={iiifUrl} />;
  }

  const artworkCards = artworks.map(createArtworkCard);

  return artworks.length === 0 ? (
    <NotFoundPlaceholder message={NO_RESULTS_MESSAGE} />
  ) : (
    <section className="search-results">
      <div className="search-results__title__container">
        <h2 className="search-results__title__text">Results Of A Search</h2>
        <div className="sort-icon">
          <SortMenu data={artworks} setData={setArtworks} />
        </div>
      </div>
      <div className="search-results__main">{artworkCards}</div>
    </section>
  );
}
