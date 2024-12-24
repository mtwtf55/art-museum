import "./Favourites.scss";

import { ArtworkCardSmall, Footer, Header } from "@Components";
import LoadingPlaceholder from "@Components/Placeholders/LoadingPlaceholder/LoadingPlaceholder";
import NotFoundPlaceholder from "@Components/Placeholders/NotFoundPlaceholder/NotFoundPlaceholder";
import SortMenu from "@Components/SortMenu/SortMenu";
import { DEFAULT_IIIF_URL, REQUESTED_FIELDS } from "@Constants/constants";
import { Artwork, ArtworksResponseType } from "@Types/types";
import { createRequestUrl } from "@Utils/functions/createRequestUrl";
import mutateSet from "@Utils/functions/mutateSet";
import { sessionStorageHelper } from "@Utils/functions/sessionStorageHelper";
import { useQuery } from "@Utils/hooks/useQuery";
import React, { useEffect, useMemo } from "react";

const NO_FAVOURITE_ITEMS_MESSAGE = `You don't have any favourite artworks`;

function Favourites() {
  const storageHelper = useMemo(sessionStorageHelper, []);
  const validIds = useMemo(
    () => storageHelper.getValidArtworksIds(),
    [storageHelper],
  );

  const {
    query: getFavourites,
    data: favourites,
    loading: favouritesLoading,
    setData: setFavourites,
  } = useQuery<ArtworksResponseType>({
    url: createRequestUrl()
      .ids(validIds.map(Number))
      .fields(REQUESTED_FIELDS)
      .build(),
  });

  useEffect(() => {
    if (validIds.length !== 0) getFavourites();
  }, [validIds]);

  function createArtworkCard(a: Artwork) {
    return (
      <ArtworkCardSmall
        artwork={a}
        key={a.id}
        iiifUrl={favourites?.config.iiif_url || DEFAULT_IIIF_URL}
      />
    );
  }

  const favouriteItems = favourites?.data.map(createArtworkCard);
  const handleSetFavourites = mutateSet(setFavourites);

  return (
    <div>
      <Header />
      {favouritesLoading ? (
        <LoadingPlaceholder />
      ) : (
        <div className="favourites-wrapper">
          <div className="favourites">
            <FavouritesTitle />
            {!favouriteItems || favouriteItems.length === 0 ? (
              <NotFoundPlaceholder message={NO_FAVOURITE_ITEMS_MESSAGE} />
            ) : (
              <main className="favourites__main">
                <div className="favourites__main__title">
                  <h4 className="favourites__main__title__sub">Saved by you</h4>
                  <h2 className="favourites__main__title__main">
                    Your favorites list
                    <div className="sort-icon">
                      <SortMenu
                        data={favourites?.data ?? []}
                        setData={handleSetFavourites}
                      />
                    </div>
                  </h2>
                </div>
                <div className="favourites__main__list">{favouriteItems}</div>
              </main>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

function FavouritesTitle() {
  return (
    <h1 className="favourites__title">
      Here Are Your
      <br />
      <span className="favourites__title__sub">
        <svg
          width="38"
          height="49"
          viewBox="0 0 38 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.2573 45.9032L18.9993 36.4409L2.74121 45.9032V8.05375C2.74121 6.79897 3.23061 5.59557 4.10175 4.7083C4.97288 3.82103 6.1544 3.32257 7.38637 3.32257H30.6122C31.8442 3.32257 33.0257 3.82103 33.8968 4.7083C34.7679 5.59557 35.2573 6.79897 35.2573 8.05375V45.9032Z"
            stroke="#F17900"
            strokeWidth="4.69765"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>{" "}
        Favourites
      </span>
    </h1>
  );
}

export default Favourites;
